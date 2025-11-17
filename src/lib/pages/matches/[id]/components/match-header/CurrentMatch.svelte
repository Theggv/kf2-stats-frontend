<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import { GameMode, GameStatus } from '$lib/api/sessions';
  import { getTimeSince } from '$lib/hooks';
  import { dateDiff } from '$lib/util/date';
  import {
    diffToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';
  import { onDestroy } from 'svelte';

  export let item: Match;
  $: details = item.details as Required<Match['details']>;

  const { from, data: timeSince, interval } = getTimeSince();
  $: item.session.started_at && from.set(new Date(item.session.started_at));

  onDestroy(() => clearInterval(interval));
</script>

<div class="root">
  <span class="map">{details.map.name}</span>

  <div class="keyvalue">
    <span>
      {modeToString(item.session.mode)}
    </span>
    <span>
      {#if !details.extra_data || !details.extra_data.spawn_cycle}
        {diffToString(item.session.diff)}
      {:else}
        <span>{details.extra_data.spawn_cycle}</span>
        <span>{details.extra_data.max_monsters}mm</span>
        {#if details.extra_data.zeds_type != 'vanilla'}
          <span>{details.extra_data.zeds_type} zeds</span>
        {/if}
      {/if}
    </span>
  </div>

  <div class="keyvalue">
    <span>Wave</span>
    <span>
      {#if item.session.mode === GameMode.Endless}
        {details.game_data.wave}
      {:else}
        {details.game_data.wave} / {item.session.length}
      {/if}
    </span>
  </div>

  <div class="keyvalue">
    {#if item.session.started_at && item.session.completed_at}
      <span>
        {dateDiff(
          new Date(item.session.started_at),
          new Date(item.session.completed_at)
        )}
      </span>
    {:else if item.session.status === GameStatus.InProgress}
      <span>{$timeSince} </span>
    {:else if item.session.started_at && item.session.started_at != item.session.updated_at}
      <span>
        {dateDiff(
          new Date(item.session.started_at),
          new Date(item.session.updated_at)
        )}
      </span>
    {/if}
    <span>{statusToString(item.session.status)}</span>
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 0 1rem;
    flex-wrap: wrap;
  }

  .map {
    font-weight: bold;
    font-size: 16px;
  }

  .keyvalue {
    display: flex;
  }

  .keyvalue > span:first-child {
    display: flex;
    flex-direction: row;
  }

  .keyvalue > span:first-child:not(span:last-child)::after {
    content: '\2014';
    display: block;
    color: var(--text-secondary);
    padding: 0 0.25rem;
  }
</style>
