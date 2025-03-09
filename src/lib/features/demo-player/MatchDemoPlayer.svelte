<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import type { DemoRecordAnalysis } from '$lib/api/sessions/demo';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import { writable } from 'svelte/store';
  import { tickToTime } from './utils';
  import { getMatchDemoPlayerStore } from './MatchDemoPlayer.store';
  import { onMount } from 'svelte';
  import type { UserProfile } from '$lib/api/common';
  import { ActionIcon } from '@svelteuidev/core';
  import { AiOutlinePause } from 'svelte-icons-pack/ai';
  import { BsPlayFill } from 'svelte-icons-pack/bs';
  import { CgPlayBackwards, CgPlayForwards } from 'svelte-icons-pack/cg';
  import PlayerState from './components/player/PlayerState.svelte';
  import {
    prepareHealthData,
    prepareBuffsData,
    getWavePlayers,
    getKillEvents,
    getLastHealthEvent,
    getLastBuffEvent,
    getUserProfile,
    getPlayerPerk,
    getUserProfileByUserId,
    prepareMajorEventsData,
  } from './MatchDemoPlayer.data';
  import { DemoPlayerControls } from './components/control';
  import {
    GlobalZedsLeftEvent,
    GlobalZedTimeEvent,
    PlayerZedKillEvent,
  } from './components/events';

  export let data: DemoRecordAnalysis;
  export let users: UserProfile[];

  const control = getMatchDemoPlayerStore();
  const { speed, playing, currentTick } = control;

  const selectedWaveIdx = writable<number>(0);

  $: selectedWave = data.waves.length
    ? data.waves[$selectedWaveIdx]
    : undefined;

  $: {
    selectedWave &&
      control.range.set({
        start_tick: selectedWave.start_tick,
        end_tick: selectedWave.end_tick,
      });
  }

  $: majorEvents = prepareMajorEventsData($currentTick, selectedWave);

  $: healthData = prepareHealthData(selectedWave);
  $: buffsData = prepareBuffsData(selectedWave);

  $: wavePlayers = getWavePlayers(data, selectedWave);

  $: killEvents = getKillEvents(selectedWave, $currentTick, onlyLarges);
  $: onlyLarges = false;

  onMount(() => {
    function handleKeyDown(ev: KeyboardEvent) {
      if (ev.key === ' ') {
        if ($playing) control.pause();
        else control.play();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<AutoScroll>
  <div role="none" class="root">
    <div class="waves">
      <div class="title">Waves</div>

      <div class="content">
        {#each data.waves as wave, index (`${data.header.session_id} ${wave.start_tick}`)}
          <div
            class="item"
            class:selected={$selectedWaveIdx === index}
            role="button"
            tabindex="0"
            on:click={() => selectedWaveIdx.set(index)}
            on:keypress={(e) => e.key === 'Enter' && selectedWaveIdx.set(index)}
          >
            <div class="number">Wave {wave.wave}</div>
            <div class="period">
              ({tickToTime(wave.start_tick)} - {tickToTime(wave.end_tick)})
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="players">
      <div class="title">Players</div>

      <div class="content">
        {#if selectedWave}
          {#each wavePlayers as player (player.unique_id)}
            {@const { health, armor } = getLastHealthEvent(
              player.user_id,
              $currentTick,
              healthData
            )}

            {@const buffs = getLastBuffEvent(
              player.user_id,
              $currentTick,
              buffsData
            )}
            <PlayerState
              profile={getUserProfile(player, users)}
              perk={getPlayerPerk(player.user_id, selectedWave)}
              {health}
              {armor}
              {buffs}
            />
          {/each}
        {/if}
      </div>
    </div>

    <div class="data">
      <div class="title">Events</div>

      <GlobalZedsLeftEvent event={majorEvents.zedsLeft} />
      <GlobalZedTimeEvent event={majorEvents.zedtime} />
    </div>

    <div class="kill-feed">
      <div class="header">
        <div class="title">Kill ticket</div>

        <div class="checkbox">
          <label for="checkbox-only-larges">Only larges</label>
          <input
            id="checkbox-only-larges"
            type="checkbox"
            bind:checked={onlyLarges}
          />
        </div>
      </div>

      {#if selectedWave}
        {#each killEvents as kill, index (`${data.header.session_id} ${selectedWave.start_tick} ${index} ${JSON.stringify(kill)}`)}
          <PlayerZedKillEvent
            event={kill}
            user={getUserProfileByUserId(kill.user_id, data, users)}
          />
        {/each}
      {/if}
    </div>

    <div class="progress">
      {#if selectedWave}
        <DemoPlayerControls
          wave={selectedWave}
          bind:currentTick={$currentTick}
        />
      {/if}
    </div>

    <div class="control">
      <div class="button">
        {#if $playing}
          <ActionIcon on:click={() => control.pause()}>
            <Icon src={AiOutlinePause} size={40} />
          </ActionIcon>
        {:else}
          <ActionIcon on:click={() => control.play()}>
            <Icon src={BsPlayFill} size={40} />
          </ActionIcon>
        {/if}
      </div>

      <div class="timer">
        {#if selectedWave}
          {tickToTime($currentTick)} / {tickToTime(selectedWave.end_tick)}
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
      'waves players data kill-feed' 400px
      'progress progress progress progress' 1px
      'control control control control' auto
      / 200px 300px 1fr 300px;

    gap: 0.25rem 1rem;
  }

  .waves,
  .players {
    max-height: 300px;
  }

  .waves {
    grid-area: waves;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    border-right: 2px solid rgb(255 255 255 / 0.1);
  }

  .title {
    font-weight: bold;
    font-size: 16px;
  }

  .waves > .title {
    padding: 0.25rem 0.5rem;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .waves > .content > .item {
    padding: 0.25rem 0.5rem;
    display: grid;
    grid-template-columns: 8ch auto;
    align-items: center;

    cursor: pointer;
    border-radius: 0.25rem;
    user-select: none;
  }

  .waves > .content > .item > .period {
    font-size: 12px;
  }

  .waves > .content > .item:hover {
    background-color: rgb(255 255 255 / 0.1);
  }

  .waves > .content > .item.selected {
    background-color: rgb(255 255 255 / 0.15);
  }

  .players {
    grid-area: players;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding-right: 1rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);
  }

  .data {
    grid-area: data;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding-right: 1rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);
  }

  .kill-feed {
    grid-area: kill-feed;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .kill-feed > .header {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
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

  .checkbox {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .checkbox > input {
    width: 1rem;
    aspect-ratio: 1;
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
