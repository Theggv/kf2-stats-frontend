<script lang="ts">
  import { Status } from '$lib/api/sessions';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import { derived, writable, type Readable } from 'svelte/store';
  import type { PageData } from './$types';
  import CurrentMatch from './CurrentMatch.svelte';
  import StatsContainer from './StatsContainer.svelte';
  import { getStore, isMatchLive } from './store';
  import MatchLiveData from './MatchLiveData.svelte';

  export let data: PageData;

  const [matchIdStore, match, waves, liveData, loading] = getStore();

  $: matchIdStore.set(data.sessionId);

  type Tab = { id: string; content: string };

  const tabs: Readable<Tab[]> = derived(match, ($match) => {
    const status = $match?.session.status;
    if (status === Status.Lobby || status === Status.InProgress) {
      return [
        { id: 'live', content: 'Live' },
        { id: 'stats', content: 'Match Stats' },
      ];
    }
    return [];
  });

  const selectedTab = writable<string>('live');
</script>

<ListLayout>
  <svelte:fragment slot="header">
    <div class="header">
      {#if $match}
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
    {#if $match && !isMatchLive($match.session.status)}
      <CurrentMatch match={$match} />
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="content">
    <ul>
      {#each $tabs as tab (tab)}
        <li class:selected={$selectedTab === tab.id}>
          <div
            role="button"
            on:keypress
            on:click={() => selectedTab.set(tab.id)}
            tabindex="0"
          >
            {tab.content}
          </div>
        </li>
      {/each}
    </ul>
    {#if $selectedTab === 'stats' || $tabs.length === 0}
      {#if $loading && !$match}
        <div>loading</div>
      {:else if $match}
        <StatsContainer match={$match} waves={$waves} />
      {/if}
    {:else if $selectedTab === 'live' && $match && $liveData}
      <MatchLiveData data={$liveData} match={$match} />
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

  ul {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  li {
    font-weight: bold;
  }

  .selected {
    border-bottom: 2px solid var(--text-primary);
  }
</style>
