import {
  MatchesApiService,
  type GetMatchLiveDataResponse,
} from '$lib/api/matches';
import { ServersApiService } from '$lib/api/servers';
import { GameStatus } from '$lib/api/sessions';
import { debounce } from '$lib/util';
import { writable } from 'svelte/store';

function isMatchLive(status: GameStatus) {
  return status === GameStatus.Lobby || status === GameStatus.InProgress;
}

export function getStore() {
  let intervalId: NodeJS.Timeout | number;

  const serverIdStore = writable<number | null>(null);

  const liveData = writable<GetMatchLiveDataResponse | null>(null);

  const fetch = debounce(async (server_id: number) => {
    try {
      const { data: session } = await ServersApiService.getLastSession(
        server_id
      );

      intervalId = setTimeout(() => fetch(server_id), 15000);

      if (isMatchLive(session.status)) {
        await MatchesApiService.getMatchLive(session.id).then(({ data }) =>
          liveData.set(data)
        );
      } else {
        liveData.set(null);
      }
    } catch (err) {}
  }, 100);

  serverIdStore.subscribe((id) => {
    if (!id) return;
    clearTimeout(intervalId);
    fetch(id);
  });

  return { serverIdStore, liveData };
}
