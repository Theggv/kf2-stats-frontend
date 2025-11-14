import type { GetPlayedMapsRequest } from '$lib/api/analytics';
import { ServersApiService, type ServerData } from '$lib/api/servers';
import { derived, readonly, writable } from 'svelte/store';

export type SelectOption = {
  id: number;
  label: string;
  disabled?: boolean;
};

export function getStore() {
  const perks = new Array(10).fill(0).map((_, i) => i + 1);
  const servers = writable<ServerData[]>([]);

  const searchText = writable<string>('');
  const selectedPerks = writable<SelectOption[]>([]);
  const selectedServerIds = writable<SelectOption[]>([]);

  const fetchServers = async () => {
    try {
      await ServersApiService.getByPattern().then(({ data }) => {
        servers.set(data.sort((a, b) => a.name.localeCompare(b.name)));
      });
    } catch (err) {}
  };

  fetchServers();

  const filter = derived(
    [searchText, selectedPerks, selectedServerIds],
    ([searchText, perks, serverIds]): Omit<
      GetPlayedMapsRequest,
      'user_id'
    > => ({
      search_text: searchText,
      perks: perks.map((x) => x.id),
      server_ids: serverIds.map((x) => x.id),
    })
  );

  return {
    perks,
    servers: readonly(servers),
    searchText,
    selectedPerks,
    selectedServerIds,
    filter,
  };
}
