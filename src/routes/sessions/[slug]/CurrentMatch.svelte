<script lang="ts">
  import type { MatchData } from '$lib/api/matches';
  import { Mode, Status } from '$lib/api/sessions';
  import { dateDiff } from '$lib/util/date';
  import {
    diffToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';
  import type { WithRequired } from '$lib/util/types';

  export let match: WithRequired<MatchData, 'game_data' | 'map'>;
</script>

<div class="root">
  <span class="map">{match.map.name}</span>

  <div class="keyvalue">
    <span>
      {modeToString(match.session.mode)}
    </span>
    <span>
      {#if !match.cd_data || !match.cd_data.spawn_cycle}
        {diffToString(match.session.diff)}
      {:else}
        <span>{match.cd_data.spawn_cycle}</span>
        <span>{match.cd_data.max_monsters}mm</span>
        {#if match.cd_data.zeds_type != 'vanilla'}
          <span>{match.cd_data.zeds_type} zeds</span>
        {/if}
      {/if}
    </span>
  </div>

  <div class="keyvalue">
    <span>Wave</span>
    <span>
      {#if match.session.mode === Mode.Endless}
        {match.game_data.wave}
      {:else}
        {match.game_data.wave} / {match.session.length}
      {/if}
    </span>
  </div>

  <div class="keyvalue">
    {#if match.session.started_at && match.session.completed_at}
      <span>
        {dateDiff(
          new Date(match.session.started_at),
          new Date(match.session.completed_at)
        )}
      </span>
    {:else if match.session.status === Status.InProgress}
      <span>
        {dateDiff(new Date(match.session.started_at), new Date())}
      </span>
    {:else if match.session.started_at && match.session.started_at != match.session.updated_at}
      <span>
        {dateDiff(
          new Date(match.session.started_at),
          new Date(match.session.updated_at)
        )}
      </span>
    {/if}
    <span>{statusToString(match.session.status)}</span>
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: row;
    gap: 0 1rem;
    flex-wrap: wrap;
  }

  .map {
    font-weight: bold;
    font-size: 18px;
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
