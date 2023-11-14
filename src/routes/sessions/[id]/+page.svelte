<script lang="ts">
  import { SITE_NAME } from '$lib';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import type { PageData } from './$types';
  import CurrentMatch from './CurrentMatch.svelte';
  import StatsContainer from './StatsContainer.svelte';
  import { matchStore, wavesStore } from './store';

  const [match, matchLoading, , fetchMatch] = matchStore();
  const [waves, wavesLoading, , fetchWaves] = wavesStore();

  export let data: PageData;

  $: fetchMatch(data.sessionId);
  $: fetchWaves(data.sessionId);
</script>

<svelte:head>
  {#if $match}
    <title>{$match.server.name} | Matches | {SITE_NAME}</title>
  {/if}
</svelte:head>

<ListLayout>
  <svelte:fragment slot="header">
    <div class="header">
      {#if $matchLoading}
        <div>loading</div>
      {:else if $match}
        <a class="server-name" href="/servers/{$match.session.server_id}">
          {$match.server.name}
        </a>
        <div class="address">
          <StyledAddress address={$match.server.address}>
            {$match.server.address}
          </StyledAddress>
        </div>
        <div class="date">
          {new Date($match.session.updated_at).toLocaleString('default', {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </div>
      {/if}
    </div>
    {#if $matchLoading}
      <div>loading</div>
    {:else if $match}
      <CurrentMatch match={$match} />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#if $matchLoading || $wavesLoading}
      <div>loading</div>
    {:else if $match}
      <StatsContainer match={$match} waves={$waves} />
    {/if}
  </svelte:fragment>
</ListLayout>

<style>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0rem 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 1280px) {
    .address {
      display: none;
    }
  }

  .date {
    flex: 1;
    text-align: right;
    color: var(--text-secondary);
    text-wrap: nowrap;
  }

  .server-name {
    font-size: 20px;
    font-weight: bold;
  }
</style>
