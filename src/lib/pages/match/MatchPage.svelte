<script lang="ts">
  import ListLayout from '$lib/layouts/ListLayout.svelte';
  import { ContextName, getMatchStore } from './store';
  import {
    LiveDataTab,
    OverviewTab,
    StatsTab,
    GraphsTab,
    ReplayTab,
  } from './tabs';
  import { setContext } from 'svelte';
  import { MatchHeader } from './components/match-header';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';

  export let matchId: number;

  $: isPreview = $page.url.searchParams.has('preview');

  const store = getMatchStore();
  const { live, loading } = store.match;
  $: store.matchId.set(matchId);

  setContext(ContextName, store);

  type TabData = {
    label: string;
    component: any;
    render?: () => boolean;
    onClick?: () => any;
  };

  $: tabs = [
    { label: 'Live', component: LiveDataTab, render: () => !!$live },
    { label: 'Overview', component: OverviewTab },
    { label: 'Stats', component: StatsTab },
    { label: 'Graphs', component: GraphsTab },
    {
      label: 'Replay',
      component: ReplayTab,
      render: () => isPreview,
      onClick: handleClickReplay,
    },
  ] as TabData[];

  $: filteredTabs = tabs.filter((x) => !x.render || x.render());

  $: selectedTabIndex = 0;
  $: selectedTab = filteredTabs[selectedTabIndex];

  function fetchReplayOnMatchChange(matchId: number) {
    store.demo.error.set(false);
    store.demo.loading.set(false);

    if (selectedTab.label === 'Replay') {
      store.demo.fetch(matchId);
    }
  }

  function handleClickReplay() {
    const { demo, error, loading } = store.demo;

    if (get(demo) || get(error) || get(loading)) return;

    store.demo.fetch(matchId);
  }

  $: fetchReplayOnMatchChange(matchId);
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
            on:click={() => {
              selectedTabIndex = index;
              tab.onClick && tab.onClick();
            }}
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
