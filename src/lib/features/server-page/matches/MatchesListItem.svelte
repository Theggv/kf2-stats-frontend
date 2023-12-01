<script lang="ts">
  import { Mode, Status } from '$lib/api/sessions';
  import { getWaveText } from '$lib/util/converters';
  import { getTimeSinceNow } from '$lib/util/date';
  import { diffToString, modeToString } from '$lib/util/enum-to-text';
  import type { ServerMatch } from '../common';

  export let data: ServerMatch;

  function getMatchClass(data: ServerMatch) {
    if (data.session.status === Status.InProgress) return 'in-progress';

    if (data.session.mode === Mode.Endless) return '';

    if (data.session.status === Status.Lose) return 'lose';
    if (data.session.status === Status.Win) return 'win';

    return '';
  }
</script>

<a
  class="root {getMatchClass(data)}"
  href="/sessions/{data.session.session_id}"
  target="_blank"
  rel="noopener noreferrer"
>
  <div class="match">
    <div class="secondary">
      <div class="map">
        {data.map.name}
      </div>
      <div class="time">
        {getTimeSinceNow(new Date(data.session.updated_at), true)}
      </div>
    </div>
  </div>

  <div class="settings">
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
          {diffToString(data.session.diff)}
        </span>
      {/if}
    </div>
  </div>

  <div class="container-end">
    <div class="wave">
      <div class="title">Wave</div>
      <div>
        {getWaveText(data.game_data.wave, data.session)}
      </div>
    </div>
  </div>
</a>

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
    width: 375px;
  }

  .match .secondary {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
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
