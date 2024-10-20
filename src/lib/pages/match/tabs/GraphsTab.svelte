<script lang="ts">
  import { getContext } from 'svelte';
  import {
    getMatchStore,
    getSelectedUserStore,
    getWaveInputStore,
  } from '../store';
  import { findUserProfile, groupByUserId, tryGetPlayerData } from './util';
  import { UserProfileColor } from '../components/user-profile';
  import { GraphContainer } from '../components/graphs';
  import {
    aggregateData,
    graphColors,
    normalizeData,
    prepareDatasets,
    prepareLabels,
  } from './GraphsTab.util';
  import { getSelecterUsersStore, graphOptions } from './GraphsTab.store';
  import { Checkbox } from '@svelteuidev/core';
  import { AutoScroll } from '$lib/components/auto-scroll';

  const waves =
    getContext<ReturnType<typeof getMatchStore>['waves']>('match-waves');
  const users =
    getContext<ReturnType<typeof getMatchStore>['users']>('match-users');
  const { wave: currentWave } =
    getContext<ReturnType<typeof getWaveInputStore>>('wave-input');

  const { hover } = getSelectedUserStore();
  const { selected, toggle: toggleUser } = getSelecterUsersStore();

  $: userStats = groupByUserId($waves);

  $: selectedStats = 0;
  $: shouldAggregate = true;

  $: normalized = normalizeData($waves);
  $: aggregated = aggregateData(normalized);

  $: datasets = prepareDatasets(
    shouldAggregate ? aggregated : normalized,
    graphColors,
    $users,
    graphOptions[selectedStats].selector
  );

  $: filteredDatasets = $selected.length
    ? datasets.filter((dataset) => $selected.includes(dataset.user_id))
    : datasets;
</script>

<AutoScroll>
  <div class="root">
    <div class="content">
      <div class="left">
        <div class="info">Players ({userStats.length} / 6)</div>

        <div class="players">
          {#each userStats as user, index (user.user_id)}
            {@const profile = findUserProfile($users, user.user_id)}
            {@const playerData = tryGetPlayerData(user, $currentWave)}

            <div class="item">
              <UserProfileColor
                {profile}
                {playerData}
                on:mouseenter={() => ($hover = user.user_id)}
                on:mouseleave={() => ($hover = -1)}
                on:click={() => toggleUser(user.user_id)}
                on:keypress={(e) =>
                  e.key === 'Enter' && toggleUser(user.user_id)}
                hover={$hover === user.user_id}
                active={$selected.includes(user.user_id)}
                color={graphColors[index]}
              />
            </div>
          {/each}
        </div>
      </div>

      <div class="right">
        <div class="header">
          {#each graphOptions as option, idx (idx)}
            <div
              class="button"
              class:selected={selectedStats === idx}
              role="button"
              tabindex="0"
              on:click={() => (selectedStats = idx)}
              on:keypress={(e) => e.key === 'Enter' && (selectedStats = idx)}
            >
              {option.title}
            </div>
          {/each}
        </div>

        <div class="graph">
          <GraphContainer
            labels={prepareLabels($waves)}
            formatter={graphOptions[selectedStats].formatter}
            datasets={filteredDatasets}
            hoverId={$hover}
          />
          <div class="checkbox">
            <Checkbox
              bind:checked={shouldAggregate}
              label="Sum previous waves"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</AutoScroll>

<style>
  .root {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 640px) {
    .root {
      max-width: calc(100vw - 1.75rem);
    }
  }
  @media (min-width: 640px) {
    .root {
      max-width: 572px;
    }
  }
  @media (min-width: 768px) {
    .root {
      max-width: 700px;
    }
  }
  @media (min-width: 1024px) {
    .root {
      max-width: 956px;
    }
  }
  @media (min-width: 1280px) {
    .root {
      max-width: 896px;
    }
  }
  @media (min-width: 1536px) {
    .root {
      max-width: 1150px;
    }
  }

  .content {
    flex: 1;
    display: grid;
    grid-template-columns: 300px 1fr;
    position: relative;
    padding-bottom: 0.5rem;
    overflow-x: hidden;
  }

  @media (max-width: 640px) {
    .content {
      display: flex;
      flex-direction: column;
    }
  }

  .content::-webkit-scrollbar {
    width: 12px;
  }

  .content::-webkit-scrollbar-track {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  .content::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #9ca3af;
  }

  .left,
  .right {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .left {
    position: sticky;
    left: 0;

    z-index: 100;
    padding-bottom: calc(12px + 0.25rem);
  }

  .right {
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .right::-webkit-scrollbar {
    height: 12px;
  }

  .right::-webkit-scrollbar-track {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  .right::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #9ca3af;
  }

  .info,
  .header {
    min-height: 48px;
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 14px;
    padding-bottom: 3px;

    color: var(--text-secondary);
    font-weight: bold;
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.1));
  }

  .players {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding: 0 0 0 1rem;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: rgb(0 0 0 / 0.1);
  }

  .header .button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem;
    width: 110px;
    color: var(--text-secondary);
    border-bottom: 2px solid transparent;
  }

  .header .button.selected {
    border-bottom-color: var(--text-secondary);
  }

  .graph {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .checkbox {
    margin-left: auto;
  }
</style>
