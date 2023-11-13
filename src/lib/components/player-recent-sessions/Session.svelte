<script lang="ts">
  import { Mode, Status } from '$lib/api/sessions';
  import type { RecentSessionsResponseSession } from '$lib/api/users';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { getWaveText } from '$lib/util/converters';
  import {
    diffToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';

  export let data: RecentSessionsResponseSession;

  $: perks = data.perks.filter((x) => x);
</script>

<div class="time">
  {new Date(data.updated_at).toLocaleTimeString()}
</div>

<a class="server" href="/sessions/{data.id}">
  {data.server.name}
</a>

<div class="perks">
  {#each perks as perk (perk)}
    <PerkIcon {perk} prestige={0} />
  {/each}
</div>

<a class="settings" href="/sessions/{data.id}">
  <div class="map">
    {data?.map_name}
  </div>
  <div class="game-info">
    <span>
      {modeToString(data.mode)}
    </span>
    {#if data.cd_data}
      <span>
        {data.cd_data.spawn_cycle}
      </span>
      <span>
        {data.cd_data.max_monsters}mm
      </span>
      {#if data.cd_data.zeds_type.toLowerCase() !== 'vanilla'}
        <span>
          {data.cd_data.zeds_type.toLowerCase()} zeds
        </span>
      {/if}
    {:else}
      <span>
        {diffToString(data.diff)}
      </span>
    {/if}

    {#if data.mode !== Mode.Endless}
      <span>
        ({data.length} Waves)
      </span>
    {/if}
  </div>
</a>

<div class="wave">
  {getWaveText(data.wave, data)}
</div>

<div
  class="status"
  class:lost={data.status === Status.Lose}
  class:won={data.status === Status.Win}
  class:in-progress={data.status === Status.InProgress}
>
  {statusToString(data.status)}
</div>

<style>
  .time {
    text-align: center;
    color: var(--text-secondary);
  }

  .server {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
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
  .server,
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
