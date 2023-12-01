<script lang="ts">
  import type { RecentUsersResponseUser } from '$lib/api/servers';
  import { Mode, Status } from '$lib/api/sessions';
  import Player from '$lib/components/player/Player.svelte';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { getWaveText } from '$lib/util/converters';
  import { getTimeSinceNow } from '$lib/util/date';
  import { diffToString, modeToString } from '$lib/util/enum-to-text';

  export let data: RecentUsersResponseUser;

  function getMatchClass(data: RecentUsersResponseUser) {
    if (data.session.status === Status.InProgress) return 'in-progress';

    if (data.session.mode === Mode.Endless) return '';

    if (data.session.status === Status.Lose) return 'lose';
    if (data.session.status === Status.Win) return 'win';

    return '';
  }
</script>

<div class="root {getMatchClass(data)}">
  <div class="match">
    <Player {data} compact>
      <div class="secondary">
        <div class="map">
          {data.session.map_name}
        </div>
        <div class="time">
          {getTimeSinceNow(new Date(data.updated_at), true)}
        </div>
      </div>
    </Player>
  </div>

  <div class="perks">
    {#each data.session.perks.filter((x) => x) as perk (perk)}
      <PerkIcon {perk} prestige={0} />
    {/each}
  </div>

  <a class="settings" href="/sessions/{data.session.id}">
    <div class="title list">
      <span>
        {modeToString(data.session.mode, false)}
      </span>
      {#if data.session.mode !== Mode.Endless}
        <span>
          ({data.session.length} Waves)
        </span>
      {/if}
    </div>
    <div class="list">
      {#if data.session.cd_data}
        {@const cd_data = data.session.cd_data}
        <span>
          {cd_data.spawn_cycle}
        </span>
        <span>
          {cd_data.max_monsters}mm
        </span>
        {#if cd_data.zeds_type.toLowerCase() !== 'vanilla'}
          <span>
            {cd_data.zeds_type.toLowerCase()} zeds
          </span>
        {/if}
      {:else}
        <span>
          {diffToString(data.session.diff)}
        </span>
      {/if}
    </div>
  </a>

  <div class="container-end">
    <div class="wave">
      <div class="title">Wave</div>
      <div>
        {getWaveText(data.session.wave, data.session)}
      </div>
    </div>
  </div>
</div>

<style>
  :root {
    --color-bg-even: rgba(117, 147, 147, 0.1);
    --color-bg-odd: rgba(175, 215, 215, 0.1);
    --color-grad-win: rgba(46, 158, 46, 0.1);
    --color-grad-lose: rgba(217, 100, 100, 0.05);
  }

  .root {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    padding: 0 0.25rem;
    padding-left: 2rem;
    font-weight: bold;
  }

  .root:nth-child(even) {
    background: var(--color-bg-even);
  }

  .root:nth-child(odd) {
    background: var(--color-bg-odd);
  }

  .root.win:nth-child(even) {
    background: linear-gradient(
      to right,
      var(--color-grad-win),
      var(--color-bg-even) 20%
    );
  }

  .root.win:nth-child(odd) {
    background: linear-gradient(
      to right,
      var(--color-grad-win),
      var(--color-bg-odd) 20%
    );
  }

  .root.lose:nth-child(even) {
    background: linear-gradient(
      to right,
      var(--color-grad-lose),
      var(--color-bg-even) 20%
    );
  }

  .root.lose:nth-child(odd) {
    background: linear-gradient(
      to right,
      var(--color-grad-lose),
      var(--color-bg-odd) 20%
    );
  }

  .title {
    color: var(--text-secondary);
    font-size: 14px;
  }

  .list,
  .list > * {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }

  .list > *::after {
    font-size: 10px;
    content: '•';
    color: var(--text-secondary);
  }

  .list > *:last-child::after {
    display: none;
    margin: 0;
  }

  .match {
    display: flex;
    flex-direction: column;
    text-wrap: nowrap;
    width: 325px;
  }

  .match .secondary {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    font-size: 12px;
  }

  .match .map {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .match .time {
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .match .time::before {
    font-size: 10px;
    content: '•';
  }

  .perks {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 100px;
  }

  .settings {
    display: flex;
    flex-direction: column;
    text-wrap: nowrap;
    width: 275px;
  }

  .settings .game-info span {
    text-wrap: nowrap;
  }

  .container-end {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .wave {
    text-align: center;
    width: 100px;
  }

  .root::before {
    position: absolute;
    content: '';
    background: var(--text-secondary);
    left: 0;
    width: 3px;
    top: 0.25rem;
    bottom: 0.25rem;
  }

  .root.win::before {
    background: var(--color-win);
  }

  .root.lose::before {
    background: var(--color-lose);
  }

  .root.in-progress::before {
    background: var(--color-in-progress);
  }
</style>
