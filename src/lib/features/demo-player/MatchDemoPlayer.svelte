<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import type { DemoRecordAnalysis } from '$lib/api/sessions/demo';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import { tickToTime } from './utils';
  import { getDemoRecordStore } from './MatchDemoPlayer.store';
  import { onMount } from 'svelte';
  import { ActionIcon } from '@svelteuidev/core';
  import { AiOutlinePause } from 'svelte-icons-pack/ai';
  import { BsPlayFill } from 'svelte-icons-pack/bs';
  import { CgPlayBackwards, CgPlayForwards } from 'svelte-icons-pack/cg';
  import PlayerState from './components/player/PlayerState.svelte';
  import {
    getLastHealthEvent,
    getLastBuffEvent,
    prepareMajorEventsData,
    getPlayerWaveData,
    getUserProfileByUserIndex,
  } from './MatchDemoPlayer.data';
  import { DemoPlayerControls } from './components/control';
  import {
    ConnectionEvent,
    ZedTimeEvent,
    HuskRageEvent,
    PlayerBuffsEvent,
    PlayerHealthEvent,
    PlayerZedKillEvent,
    WaveProgressEvent,
    WaveStateEvent,
  } from './components/events';
  import { SelectWaves } from './components/select-waves';
  import { SelectEvents } from './components/select-events';

  export let data: DemoRecordAnalysis;
  $: users = data.players;

  const store = getDemoRecordStore(data);
  $: store.demo.set(data);

  const { selectedWave, selectedWaveIdx, selectedUserIndexes } = store;

  const {
    range: controlRange,
    speed,
    playing,
    currentTick,
    currentTickWithOffset,
  } = store.control;

  const { feed: eventsFeed, ticksSinceLastZt, eventFilter } = store.events;
  const { onlyLarges, filtered: killEvents } = store.events.kills;

  $: majorEvents = prepareMajorEventsData($currentTick, $selectedWave);

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

    <div class="header"></div>

    <div class="players">
      <div class="title">Players</div>

      <div class="content">
        {#if $selectedWave}
          {#each wavePlayers as [user_index, player] (user_index)}
            {@const hp = getLastHealthEvent($currentTick, player.health)}
            {@const buffs = getLastBuffEvent($currentTick, player.buffs)}

            <PlayerState
              on:click={() => handleClickUser(user_index)}
              on:keypress={(e) =>
                e.key === 'Enter' && handleClickUser(user_index)}
              selected={$selectedUserIndexes.includes(user_index)}
              profile={player.profile}
              perk={player.perk}
              health={hp.health}
              armor={hp.armor}
              {buffs}
            />
          {/each}
        {/if}
      </div>
    </div>

    <div class="events">
      <div class="title">
        <div>Events</div>
        <SelectEvents bind:value={$eventFilter} />
      </div>

      <WaveProgressEvent
        offset={$controlRange.start_tick}
        zedsLeft={majorEvents.zedsLeft}
        tick={$currentTick}
        ticksSinceLastZt={$ticksSinceLastZt}
      />

      <div class="content">
        {#each $eventsFeed as event (event)}
          {#if event.type === 'wave-started' || event.type === 'wave-ended'}
            <WaveStateEvent
              offset={$controlRange.start_tick}
              tick={event.from}
              started={event.type === 'wave-started'}
            />
          {:else if event.type === 'zedtime'}
            <ZedTimeEvent
              offset={$controlRange.start_tick}
              tick={$currentTick}
              event={event.payload}
            />
          {:else}
            {@const profile = getUserProfileByUserIndex(
              event.payload.user_index,
              users
            )}

            {#if event.type === 'connect' || event.type === 'death'}
              <ConnectionEvent
                offset={$controlRange.start_tick}
                tick={event.from}
                type={event.type === 'connect' ? event.payload.type : 3}
                {profile}
              />
            {:else if event.type === 'husk_r'}
              <HuskRageEvent
                offset={$controlRange.start_tick}
                event={event.payload}
                {profile}
              />
            {:else if event.type === 'buffs'}
              <PlayerBuffsEvent
                offset={$controlRange.start_tick}
                event={event.payload}
                {profile}
              />
            {:else if event.type === 'health'}
              <PlayerHealthEvent
                offset={$controlRange.start_tick}
                event={event.payload}
                {profile}
              />
            {/if}
          {/if}
        {/each}
      </div>
    </div>

    <div class="kill-feed">
      <div class="header">
        <div class="title">Kill ticket</div>

        <div class="checkbox">
          <label for="checkbox-only-larges">Only larges</label>
          <input
            id="checkbox-only-larges"
            type="checkbox"
            bind:checked={$onlyLarges}
          />
        </div>
      </div>

      {#if $selectedWave}
        {#each $killEvents as kill, index (`${data.session_id} ${$selectedWave.meta_data.start_tick} ${index} ${JSON.stringify(kill)}`)}
          <PlayerZedKillEvent
            offset={$selectedWave.meta_data.start_tick}
            event={kill}
            user={getUserProfileByUserIndex(kill.user_index, users)}
          />
        {/each}
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
      'waves events kill-feed' auto
      'players events kill-feed' 350px
      'progress progress progress' 1px
      'control control control' auto
      / 300px 1fr 300px;

    gap: 0.5rem 1rem;
  }

  .root > .header {
    grid-area: header;
    padding: 0.5rem;

    display: flex;
    flex-direction: row;
    gap: 0.5rem;
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

  .events {
    grid-area: events;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding-right: 0.5rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);

    overflow-x: hidden;
    overflow-wrap: break-word;
  }

  .events > .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .events > .content {
    max-height: 300px;
    gap: 0.125rem;
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
