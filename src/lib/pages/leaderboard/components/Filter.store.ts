import { type ServerData, ServersApiService } from '$lib/api/servers';
import { writable } from 'svelte/store';

export type SelectOption = { id: number; label: string; disabled?: boolean };

export function getStore() {
  const servers = writable<ServerData[]>([]);

  const fetch = async () => {
    try {
      await ServersApiService.getByPattern().then(({ data }) => {
        servers.set(data.sort((a, b) => a.name.localeCompare(b.name)));
      });
    } catch (err) {}
  };

  fetch();

  return { servers };
}
