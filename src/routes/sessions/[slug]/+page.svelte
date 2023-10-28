<script lang="ts">
  import { SITE_NAME } from '$lib';
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

<div class="root">
  <div class="header">
    {#if $matchLoading}
      <div>loading</div>
    {:else if $match}
      <a class="server-name" href="/servers/{$match.session.server_id}"
        >{$match.server.name}</a
      >
      <div class="address">
        <StyledAddress address={$match.server.address}>
          {$match.server.address}
        </StyledAddress>
      </div>
      <div class="date">
        {new Date($match.session.updated_at).toLocaleString('en', {
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

  {#if $matchLoading || $wavesLoading}
    <div>loading</div>
  {:else if $match}
    <StatsContainer match={$match} waves={$waves} />
  {/if}
</div>

<svelte:head>
  {#if $match}
    <title>{SITE_NAME} | Matches | {$match.server.name}</title>
  {/if}
</svelte:head>

<style>
  .root {
    flex: 1;
    min-height: 0;

    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (max-width: 1280px) {
    .address {
      display: none;
    }
  }

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0rem 1rem;
    flex-wrap: wrap;
  }

  .date {
    flex: 1;
    text-align: right;
    color: var(--text-secondary);
    text-wrap: nowrap;
  }

  .server-name {
    font-size: 20px;
  }
</style>
