<script lang="ts">
  import { SITE_NAME } from '$lib';
  import type { FilterUsersResponseUser } from '$lib/api/users';
  import PlayerList from '$lib/components/player-list/PlayerList.svelte';
  import { usersStore } from '$lib/components/player-list/store';

  const [page, filter, users, hasMore, loading, error] = usersStore();

  $: groupedUsers = $users.reduce((map, item) => {
    const key = new Date(item.updated_at).toDateString();
    if (map.has(key)) map.get(key)!.push(item);
    else map.set(key, [item]);
    return map;
  }, new Map<string, FilterUsersResponseUser[]>());
</script>

<svelte:head>
  <title>Players | {SITE_NAME}</title>
</svelte:head>

<PlayerList
  data={groupedUsers}
  hasMore={$hasMore}
  on:loadMore={() => page.update((p) => p + 1)}
/>
