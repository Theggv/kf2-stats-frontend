<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import type { RecentUsersResponseUser } from '$lib/api/servers';
  import { GameMode, GameStatus } from '$lib/api/sessions';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { getWaveText } from '$lib/util/converters';
  import {
    diffToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';
  import Player from '../player/Player.svelte';

  export let data: RecentUsersResponseUser;

  $: details = data.match.details as Required<Match['details']>;

  $: perks = details.user_data.perks.filter((x) => x);
</script>

<div class="time">
  {new Date(details.user_data.last_seen).toLocaleTimeString()}
</div>

<Player profile={data.user_profile} />

<div class="perks">
  {#each perks as perk (perk)}
    <PerkIcon {perk} prestige={0} />
  {/each}
</div>

<a class="settings" href="/sessions/{data.match.session.id}">
  <div class="map">
    {details.map.name}
  </div>
  <div class="game-info">
    <span>
      {modeToString(data.match.session.mode)}
    </span>
    {#if details.extra_data}
      {@const extra_data = details.extra_data}

      <span>
        {extra_data.spawn_cycle}
      </span>
      <span>
        {extra_data.max_monsters}mm
      </span>
      {#if extra_data.zeds_type.toLowerCase() !== 'vanilla'}
        <span>
          {extra_data.zeds_type.toLowerCase()} zeds
        </span>
      {/if}
    {:else}
      <span>
        {diffToString(data.match.session.diff)}
      </span>
    {/if}

    {#if data.match.session.mode !== GameMode.Endless}
      <span>
        ({data.match.session.length} Waves)
      </span>
    {/if}
  </div>
</a>

<div class="wave">
  {getWaveText(details.game_data.wave, data.match.session)}
</div>

<div
  class="status"
  class:lost={data.match.session.status === GameStatus.Lose}
  class:won={data.match.session.status === GameStatus.Win}
  class:in-progress={data.match.session.status === GameStatus.InProgress}
>
  {statusToString(data.match.session.status)}
</div>

<style>
  .time {
    text-align: center;
    color: var(--text-secondary);
  }

  .perks {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .settings {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex-wrap: nowrap;
  }

  .settings .map {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .settings .game-info {
    display: flex;
    flex-direction: row;
    gap: 0 0.5rem;
    flex-wrap: wrap;
  }

  .settings .game-info span {
    text-wrap: nowrap;
  }

  .wave,
  .status {
    text-align: center;
  }

  .wave,
  .map,
  .status,
  .settings {
    font-weight: bold;
  }

  .lost {
    color: rgb(217, 100, 100);
  }

  .won {
    color: rgb(46, 158, 46);
  }

  .in-progress {
    color: rgb(184, 197, 68);
  }
</style>
