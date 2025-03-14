<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextName, type ContextType } from '../MatchDemoPlayer.store';
  import {
    WaveProgressEvent,
    WaveStateEvent,
    ZedTimeEvent,
    ConnectionEvent,
    HuskRageEvent,
    PlayerBuffsEvent,
    PlayerHealthEvent,
    PlayerZedKillEvent,
  } from '../components/events';
  import { SelectEvents } from '../components/select-events';
  import {
    getUserProfileByUserIndex,
    prepareMajorEventsData,
  } from '../MatchDemoPlayer.data';

  const store = getContext<ContextType>(ContextName);
  const { selectedWave, demo } = store;

  const { range: controlRange, currentTick } = store.control;

  const { feed: eventsFeed, ticksSinceLastZt, eventFilter } = store.events;
  const { onlyLarges, filtered: killEvents } = store.events.kills;

  $: users = $demo.players;
  $: majorEvents = prepareMajorEventsData($currentTick, $selectedWave);
</script>

<div class="root">
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
      {#each $killEvents as kill, index (`${$demo.session_id} ${$selectedWave.meta_data.start_tick} ${index} ${JSON.stringify(kill)}`)}
        <PlayerZedKillEvent
          offset={$selectedWave.meta_data.start_tick}
          event={kill}
          user={getUserProfileByUserIndex(kill.user_index, users)}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template:
      'events kill-feed' auto
      / 1fr 300px;

    gap: 0.5rem 1rem;

    height: 100%;
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

  .root > .events {
    grid-area: events;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding-right: 0.5rem;
    border-right: 2px solid rgb(255 255 255 / 0.1);

    overflow-x: hidden;
    overflow-wrap: break-word;
  }

  .root > .events > .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .root > .events > .content {
    max-height: calc(100% - 100px);
    gap: 0.125rem;
  }

  .root > .kill-feed {
    grid-area: kill-feed;

    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .root > .kill-feed > .header {
    display: flex;
    gap: 0.5rem;
    justify-content: space-between;
    align-items: center;
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
