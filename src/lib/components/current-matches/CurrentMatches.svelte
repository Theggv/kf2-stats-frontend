<script lang="ts">
  import { SessionsApiService, type LiveMatch } from '$lib/api/sessions';
  import { onMount } from 'svelte';
  import MatchView from './MatchView.svelte';

  onMount(() => {
    fetchData();
    const id = setInterval(fetchData, 15000);

    return () => clearInterval(id);
  });

  async function fetchData() {
    try {
      const { data } = await SessionsApiService.getLiveMatches();

      matches = data.items;
    } catch (error) {}
  }

  let matches: LiveMatch[] = [];
</script>

<div class="bg-neutral-900 bg-opacity-60 text-neutral-300 min-w-[16rem] p-2">
  <h3 class="font-bold p-2">Current matches</h3>
  <div class="flex flex-col gap-1">
    {#each matches as match (match.session_id)}
      <MatchView {match} />
    {:else}
      <div class="p-2">No matches available</div>
    {/each}
  </div>
</div>

<style>
  h3 {
    font-size: 18px;
  }
</style>
