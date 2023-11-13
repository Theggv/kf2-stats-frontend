<script lang="ts">
  import type { RecentUsersResponseUser } from '$lib/api/servers';
  import { Mode, Status } from '$lib/api/sessions';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { getWaveText } from '$lib/util/converters';
  import {
    diffToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';

  export let data: RecentUsersResponseUser;

  $: perks = data.session.perks.filter((x) => x);
</script>

<div class="time">
  {new Date(data.updated_at).toLocaleTimeString()}
</div>
<div class="player">
  <div class="avatar">
    <a href={data.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={data.avatar} alt="" />
    </a>
  </div>
  <a class="name" href="/players/{data.id}">{data.name}</a>
</div>

<div class="perks">
  {#each perks as perk (perk)}
    <PerkIcon {perk} prestige={0} />
  {/each}
</div>

<a class="settings" href="/sessions/{data.session.id}">
  <div class="map">
    {data.session?.map_name}
  </div>
  <div class="game-info">
    <span>
      {modeToString(data.session.mode)}
    </span>
    {#if data.session.cd_data}
      <span>
        {data.session.cd_data.spawn_cycle}
      </span>
      <span>
        {data.session.cd_data.max_monsters}mm
      </span>
      {#if data.session.cd_data.zeds_type.toLowerCase() !== 'vanilla'}
        <span>
          {data.session.cd_data.zeds_type.toLowerCase()} zeds
        </span>
      {/if}
    {:else}
      <span>
        {diffToString(data.session.diff)}
      </span>
    {/if}

    {#if data.session.mode !== Mode.Endless}
      <span>
        ({data.session.length} Waves)
      </span>
    {/if}
  </div>
</a>

<div class="wave">
  {getWaveText(data.session.wave, data.session)}
</div>

<div
  class="status"
  class:lost={data.session.status === Status.Lose}
  class:won={data.session.status === Status.Win}
  class:in-progress={data.session.status === Status.InProgress}
>
  {statusToString(data.session.status)}
</div>

<style>
  .time {
    text-align: center;
    color: var(--text-secondary);
  }

  .player {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .player .avatar {
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
  }

  .player .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }

  .player .name {
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
