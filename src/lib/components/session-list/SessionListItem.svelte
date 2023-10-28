<script lang="ts">
  import type { MatchData } from '$lib/api/matches';
  import { Mode, Status } from '$lib/api/sessions';
  import StyledLink from '$lib/ui/a/StyledLink.svelte';
  import { dateDiff } from '$lib/util/date';
  import {
    diffToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';
  import type { WithRequired } from '$lib/util/types';

  export let data: WithRequired<MatchData, 'server' | 'map' | 'game_data'>;
</script>

<div class="time">
  {new Date(data.session.updated_at).toLocaleTimeString()}
</div>
<StyledLink
  newTab
  href="/sessions/{data.session.session_id}"
  rounded={false}
  class="global-session-list-item"
>
  <div>{data.server.name}</div>

  <div>
    <div>{data.map.name}</div>
    <div class="game-info">
      <span>
        {modeToString(data.session.mode)}
      </span>
      {#if data.cd_data}
        <span>
          {data.cd_data.spawn_cycle}
        </span>
        <span>
          {data.cd_data.max_monsters}mm
        </span>
        <span>
          {data.cd_data.zeds_type} zeds
        </span>
      {:else}
        <span>
          {diffToString(data.session.diff)}
        </span>
      {/if}

      <span>
        {data.session.length} Waves
      </span>
    </div>
  </div>

  <div class="wave">
    {#if data.session.status === Status.Lobby}
      -
    {:else if data.session.mode !== Mode.Endless}
      {data.game_data.wave || 0} / {data.session.length}
    {:else}
      {data.session.length}
    {/if}
  </div>

  <div class="match-length">
    {#if data.session.started_at && data.session.completed_at}
      {dateDiff(
        new Date(data.session.started_at),
        new Date(data.session.completed_at)
      )}
    {:else if data.session.status === Status.InProgress}
      {dateDiff(new Date(data.session.started_at), new Date())}
    {:else if data.session.started_at && data.session.started_at != data.session.updated_at}
      {dateDiff(
        new Date(data.session.started_at),
        new Date(data.session.updated_at)
      )}
    {:else}
      -
    {/if}
  </div>

  <div class="status">
    {statusToString(data.session.status)}
  </div>
</StyledLink>

<style>
  :global(.global-session-list-item) {
    grid-column: span 6;
    display: grid;
    grid-template-columns: subgrid;
    padding: 0.25rem;
  }

  .time {
    text-align: center;
    color: var(--text-secondary);
  }

  .wave,
  .status {
    text-align: center;
  }

  .game-info {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .game-info span::after {
    content: ',';
  }

  .game-info span:last-child::after {
    content: '';
  }

  .match-length {
    text-align: center;
  }
</style>
