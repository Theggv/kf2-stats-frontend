<script lang="ts">
  import ServerSkeleton from '$lib/components/skeletons/ServerSkeleton.svelte';
  import { onMount } from 'svelte';
  import SessionListItem from './SessionListItem.svelte';
  import { SessionsApiService } from '$lib/api/sessions';
  import { sessions } from './store';

  let loading = false;

  async function fetchSessions() {
    const { data } = await SessionsApiService.filter({
      server_id: [serverId],
      include_map: true,
    });

    sessions.set(data.items);
  }

  onMount(async () => {
    await fetchSessions();
  });

  export let serverId: number;
</script>

<div class="root">
  <table class="table-auto text-zinc-400 bg-slate-800">
    <thead>
      <th class="bg-slate-800">Сложность</th>
      <th class="bg-slate-800">Карта</th>
      <th class="bg-slate-800">Режим</th>
      <th class="bg-slate-800">Длина</th>
      <th class="bg-slate-800">Статус</th>
    </thead>
    <tbody>
      {#if loading}
        <ServerSkeleton />
        <ServerSkeleton />
        <ServerSkeleton />
      {:else}
        {#each $sessions as data (data.id)}
          <SessionListItem {data} />
        {:else}
          <tr>
            <td colspan="5" align="center">No sessions have been played</td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>

<style>
  .root {
    width: 600px;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  table {
    position: relative;
    width: 100%;
    user-select: none;
    z-index: 1;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 10;
  }
</style>
