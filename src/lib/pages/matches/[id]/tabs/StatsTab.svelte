<script lang="ts">
  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import {
    ContextName,
    getSelectedUserStore,
    getWaveUserIds,
    type ContextType,
  } from '../Match.store';
  import { findUserProfile, groupByUserId, tryGetPlayerData } from './util';
  import { Checkbox, Input } from '@svelteuidev/core';
  import { UserProfile } from '../components/user-profile';
  import { StatsHeader, WaveStats } from '../components/wave-stats';
  import { statSelectorsMultiple, statSelectorsSingle } from './StatsTab.store';

  const store = getContext<ContextType>(ContextName);
  const { waves, users } = store.match;

  const userSelect = getSelectedUserStore();
  const { hover } = userSelect;

  const {
    waveIdx,
    wave: currentWave,
    maxWaves,
    showOnlyCurrentWave,
  } = store.waveInput;

  $: userStats = groupByUserId($waves);

  const waveUserIds = getWaveUserIds(currentWave, showOnlyCurrentWave, waves);
  $: waveUserStats = userStats.filter((user) =>
    $waveUserIds.includes(user.user_id)
  );

  const selectedMetric = writable<number>(0);
  setContext('stats-selected-metric', selectedMetric);

  $: metrics = $showOnlyCurrentWave
    ? statSelectorsSingle
    : statSelectorsMultiple;

  $: selector = metrics.find((x) => x.key === $selectedMetric);

  $: currentWaveId = $currentWave?.wave_id;
  $: sortedWaveUserStats =
    selector && currentWaveId
      ? waveUserStats.toSorted(
          (a, b) =>
            (selector.selector(b, currentWaveId) || 0) -
            (selector.selector(a, currentWaveId) || 0)
        )
      : waveUserStats;
</script>

<div class="root">
  <div class="content">
    <div class="left">
      <div class="info">Players ({sortedWaveUserStats.length} / 6)</div>

      <div class="players">
        {#each sortedWaveUserStats as user (user.user_id)}
          {@const profile = findUserProfile($users, user.user_id)}
          {@const playerData = tryGetPlayerData(user, $currentWave)}

          <div class="item">
            <UserProfile
              {profile}
              {playerData}
              on:mouseenter={() => ($hover = user.user_id)}
              on:mouseleave={() => ($hover = -1)}
              hover={$hover === user.user_id}
            />
          </div>
        {/each}
      </div>
    </div>

    <div class="right">
      <div class="header">
        <StatsHeader />
      </div>

      <div class="stats">
        {#each sortedWaveUserStats as user (user.user_id)}
          <div class="item">
            <WaveStats
              userStats={user}
              showOnlyCurrentWave={$showOnlyCurrentWave}
              hover={$hover === user.user_id}
              on:mouseenter={() => ($hover = user.user_id)}
              on:mouseleave={() => ($hover = -1)}
            />
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="control">
    <div />
    {#if $maxWaves}
      <div class="slider">
        {#if $currentWave}
          {@const wave = $currentWave.wave}
          {@const attempt = $currentWave.attempt}

          <div class="label">
            Wave {wave}
            {#if attempt > 1}
              (attempt {attempt})
            {/if}
          </div>
        {/if}

        <Input
          type="range"
          variant="headless"
          min={1}
          height={20}
          bind:max={$maxWaves}
          bind:value={$waveIdx}
          override={{
            display: 'flex',
            flexDirection: 'column',
            height: '20px',
            input: { height: '20px' },
          }}
        />
      </div>
    {/if}

    <div class="checkbox">
      <Checkbox
        bind:checked={$showOnlyCurrentWave}
        label="Show only current wave"
      />
    </div>
  </div>
</div>

<style>
  .root {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow: hidden;
  }

  .content {
    flex: 1;
    display: grid;
    grid-template-columns: 250px 1fr;
    position: relative;
    padding-bottom: 0.5rem;
    overflow-x: hidden;
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

  .stats {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .control {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-bottom: 0.5rem;
  }

  .slider {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .slider > .label {
    text-align: center;
  }

  .control > .checkbox {
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    .root {
      max-width: calc(100vw - 1.75rem);
    }

    .content {
      grid-template-columns: 200px 1fr;
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

    .control {
      display: grid;
      grid-template-columns: 250px 1fr auto;
      justify-content: center;
      align-items: flex-end;
      padding: 0;
    }

    .control > .checkbox {
      margin: 0;
      padding-left: 1rem;
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
</style>
