<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import type { DemoRecordAnalysis } from '$lib/api/sessions/demo';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import { tickToTime } from './utils';
  import { ContextName, getDemoRecordStore } from './MatchDemoPlayer.store';
  import { onMount, setContext } from 'svelte';
  import { ActionIcon } from '@svelteuidev/core';
  import { AiOutlinePause } from 'svelte-icons-pack/ai';
  import { BsPlayFill } from 'svelte-icons-pack/bs';
  import { CgPlayBackwards, CgPlayForwards } from 'svelte-icons-pack/cg';
  import PlayerState from './components/player/PlayerState.svelte';
  import {
    getLastHealthEvent,
    getLastBuffEvent,
    getPlayerWaveData,
    type ReplayTabsEnum,
  } from './MatchDemoPlayer.data';
  import { DemoPlayerControls } from './components/control';

  import { SelectWaves } from './components/select-waves';
  import { writable } from 'svelte/store';
  import { MatchAnalysis, WaveAnalysis, WaveReplay } from './tabs';
  import { SelectEvents } from './components/select-events';

  export let data: DemoRecordAnalysis;
  $: users = data.players;

  const store = getDemoRecordStore(data);
  $: store.demo.set(data);

  const { selectedWave, selectedWaveIdx, selectedUserIndexes } = store;
  setContext(ContextName, store);

  const { speed, playing, currentTick, currentTickWithOffset } = store.control;
  const { eventFilter } = store.events;

  const tabs: { title: string; value: ReplayTabsEnum }[] = [
    { title: 'Wave Replay', value: 'wave-replay' },
    { title: 'Wave Analysis', value: 'wave-overview' },
    { title: 'Match Analysis', value: 'match-overview' },
  ];
  const selectedTab = writable<ReplayTabsEnum>('wave-replay');

  $: wavePlayers = getPlayerWaveData($selectedWave, users);

  function handleClickUser(idx: number) {
    if ($selectedUserIndexes.includes(idx)) {
      $selectedUserIndexes = $selectedUserIndexes.filter((x) => x !== idx);
    } else {
      $selectedUserIndexes = [...$selectedUserIndexes, idx];
    }
  }

  onMount(() => {
    function handleKeyDown(ev: KeyboardEvent) {
      if (ev.key === ' ') {
        if ($playing) store.control.pause();
        else store.control.play();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<AutoScroll>
  <div class="root">
    <div class="waves">
      <SelectWaves
        items={data.waves}
        bind:selectedIndex={$selectedWaveIdx}
        value={$selectedWave}
      />
    </div>

    <div class="tabs">
      {#each tabs as tab (tab.value)}
        <div
          class="item"
          class:selected={$selectedTab === tab.value}
          role="button"
          tabindex="0"
          on:click={() => selectedTab.set(tab.value)}
          on:keypress={(e) => e.key === 'Enter' && selectedTab.set(tab.value)}
        >
          {tab.title}
        </div>
      {/each}

      {#if $selectedTab === 'wave-replay'}
        <div class="last">
          <SelectEvents bind:value={$eventFilter} />
        </div>
      {/if}
    </div>

    <div class="players">
      <div class="title">Players</div>

      <div class="content">
        {#if $selectedWave}
          {#each wavePlayers as [user_index, player] (user_index)}
            {@const hp = getLastHealthEvent($currentTick, player.health)}
            {@const buffs = getLastBuffEvent($currentTick, player.buffs)}
            {@const isDead = player.death && $currentTick >= player.death.tick}

            <PlayerState
              on:click={() => handleClickUser(user_index)}
              on:keypress={(e) =>
                e.key === 'Enter' && handleClickUser(user_index)}
              selected={$selectedUserIndexes.includes(user_index)}
              profile={player.profile}
              perk={player.perk}
              health={isDead ? 0 : hp.health}
              armor={isDead ? 0 : hp.armor}
              buffs={isDead ? 0 : buffs}
            />
          {/each}
        {/if}
      </div>
    </div>

    <div class="tab-content">
      {#if $selectedTab === 'wave-replay'}
        <WaveReplay />
      {:else if $selectedTab === 'wave-overview'}
        <WaveAnalysis />
      {:else if $selectedTab === 'match-overview'}
        <MatchAnalysis />
      {/if}
    </div>

    <div class="progress">
      {#if $selectedWave}
        <DemoPlayerControls
          wave={$selectedWave}
          bind:currentTick={$currentTick}
        />
      {/if}
    </div>

    <div class="control">
      <div class="button">
        {#if $playing}
          <ActionIcon on:click={() => store.control.pause()}>
            <Icon src={AiOutlinePause} size={40} />
          </ActionIcon>
        {:else}
          <ActionIcon on:click={() => store.control.play()}>
            <Icon src={BsPlayFill} size={40} />
          </ActionIcon>
        {/if}
      </div>

      <div class="timer">
        {#if $selectedWave}
          {tickToTime($currentTickWithOffset)} / {tickToTime(
            $selectedWave.meta_data.end_tick -
              $selectedWave.meta_data.start_tick
          )}
        {/if}
      </div>

      <div class="speed">
        <ActionIcon on:click={() => ($speed = Math.max($speed / 2, 0.25))}>
          <Icon src={CgPlayBackwards} size={40} />
        </ActionIcon>

        <span>{$speed}x</span>

        <ActionIcon on:click={() => ($speed = Math.min($speed * 2, 16))}>
          <Icon src={CgPlayForwards} size={40} />
        </ActionIcon>
      </div>
    </div>
  </div>
</AutoScroll>

<style>
  .root {
    display: grid;
    grid-template:
      'waves tabs tabs' 56px
      'players tab-content tab-content' 1fr
      'progress progress progress' 1px
      'control control control' auto
      / 350px 1fr 300px;

    gap: 0.5rem 1rem;
    height: calc(100% - 1rem);
    overflow-y: hidden;
  }

  .root > .tabs {
    grid-area: tabs;
    padding: 0.5rem;

    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
  }

  .root > .tabs > .item {
    display: flex;
    padding: 0.25rem;
    border-bottom: 2px solid transparent;
    height: min-content;
  }

  .root > .tabs > .item.selected {
    border-bottom-color: var(--text-secondary);
  }

  .root > .tabs > .last {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .root > .tab-content {
    grid-area: tab-content;
    padding: 0.5rem;

    overflow-y: hidden;
  }

  .players {
    grid-area: players;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    padding-right: 0.5rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);
  }

  .players > .title {
    padding-left: 0.5rem;
  }

  .players > .content {
    max-height: 300px;
  }

  .progress {
    grid-area: progress;
    position: relative;
    z-index: 1;
  }

  .control {
    grid-area: control;
    padding: 0 1rem;

    display: grid;
    grid-template-columns: max-content auto max-content;
    align-items: center;
    gap: 1rem;
  }

  .control > .timer {
    font-weight: bold;
  }

  .control > .speed {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
</style>
