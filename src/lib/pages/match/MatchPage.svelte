<script lang="ts">
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import { getMatchStore, getWaveInputStore } from './store';
  import { LiveDataTab, OverviewTab, StatsTab, GraphsTab } from './tabs';
  import { setContext } from 'svelte';
  import { MatchHeader } from './components/match-header';

  export let matchId: number;

  const store = getMatchStore();
  const { overview, waves, users, live, loading, error } = store;
  $: store.matchId.set(matchId);

  const waveInputStore = getWaveInputStore(waves);

  setContext('match-loading', loading);
  setContext('match-overview', overview);
  setContext('match-waves', waves);
  setContext('match-users', users);
  setContext('match-live', live);
  setContext('wave-input', waveInputStore);

  type TabData = {
    label: string;
    component: any;
    render?: () => boolean;
  };

  $: tabs = [
    { label: 'Live', component: LiveDataTab, render: () => !!$live },
    { label: 'Overview', component: OverviewTab },
    { label: 'Stats', component: StatsTab },
    { label: 'Graphs', component: GraphsTab },
  ] as TabData[];

  $: filteredTabs = tabs.filter((x) => !x.render || x.render());

  $: selectedTabIndex = 0;
  $: selectedTab = filteredTabs[selectedTabIndex];
</script>

<ListLayout>
  <svelte:fragment slot="header">
    <MatchHeader>
      <div class="tabs">
        {#each filteredTabs as tab, index (tab.label)}
          <div
            class="tab"
            class:selected={selectedTabIndex === index}
            role="button"
            tabindex="0"
            on:click={() => (selectedTabIndex = index)}
            on:keypress={(e) => e.key === 'Enter' && (selectedTabIndex = index)}
          >
            {tab.label}
          </div>
        {/each}
      </div>
    </MatchHeader>
  </svelte:fragment>

  <svelte:fragment slot="content">
    {#if selectedTab && (!selectedTab.render || selectedTab.render())}
      <div class="content" class:loading={$loading}>
        <svelte:component this={selectedTab.component} />
      </div>
    {/if}
  </svelte:fragment>
</ListLayout>

<style>
  .tabs {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }

  .tab {
    border-bottom: 2px solid transparent;
    width: 100px;
    padding: 0.25rem;
    text-align: center;
    font-weight: bold;
  }

  .tab.selected {
    border-bottom: 2px solid var(--text-secondary);
  }

  .content {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;

    transition: opacity 250ms;
  }

  .loading {
    opacity: 0.75;
  }
</style>
