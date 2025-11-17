<script lang="ts">
  import { GameMode, GameStatus } from '$lib/api/sessions';
  import { getWaveText } from '$lib/util/converters';
  import { diffToString, modeToString } from '$lib/util/enum-to-text';
  import MediaQuery from 'svelte-media-queries';
  import { DifficultyIcon } from '$lib/ui/icons';
  import { getMatchDifficulty } from '$lib/util';
  import type { Match } from '$lib/api/matches';

  export let data: Match;

  $: details = data.details as Required<Match['details']>;

  function getMatchClass(data: Match) {
    if (data.session.status === GameStatus.InProgress) return 'in-progress';

    if (data.session.mode === GameMode.Endless) return '';

    if (data.session.status === GameStatus.Lose) return 'lose';
    if (data.session.status === GameStatus.Win) return 'win';

    return '';
  }

  function getZedsType(zedsType: string) {
    switch (zedsType.toLowerCase()) {
      case 'harder':
        return 'HZ';
      case 'nightcore':
        return 'NCZ';
    }

    return '';
  }
</script>

<a
  class="root {getMatchClass(data)}"
  href="/sessions/{data.session.id}"
  target="_blank"
  rel="noopener noreferrer"
>
  <div class="time">
    {new Date(data.session.updated_at).toLocaleTimeString()}
  </div>

  <div class="map">
    {details.map.name}
  </div>

  <div class="difficulty">
    <DifficultyIcon difficulty={getMatchDifficulty(data.metadata.diff)} />
  </div>

  <div class="settings">
    <MediaQuery query="(max-width: 768px)" let:matches>
      {#if matches}
        <div class="title">
          {details.map.name}
        </div>
      {:else}
        <div class="title list">
          <span>
            {modeToString(data.session.mode, false)}
          </span>
          {#if data.session.mode !== GameMode.Endless}
            <span>
              ({data.session.length} Waves)
            </span>
          {/if}
        </div>
      {/if}
    </MediaQuery>

    <div class="list">
      {#if details.extra_data}
        <span>
          {details.extra_data.spawn_cycle}
        </span>
        <span>
          {details.extra_data.max_monsters}mm
        </span>
        {#if details.extra_data.zeds_type.toLowerCase() !== 'vanilla'}
          <span>
            {getZedsType(details.extra_data.zeds_type)}
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
        {getWaveText(details.game_data.wave, data.session)}
      </div>
    </div>
  </div>
</a>

<style>
  :root {
    --color-bg-even: rgba(117, 147, 147, 0.1);
    --color-bg-odd: rgba(175, 215, 215, 0.1);
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

  .time {
    color: var(--text-secondary);
    display: flex;
    padding-right: 0.5rem;
  }

  .map {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    width: 200px;
    font-size: 14px;
  }

  .difficulty {
    width: 40px;
  }

  .settings {
    display: flex;
    flex-direction: column;
    text-wrap: nowrap;
    width: 200px;
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

  @media (max-width: 600px) {
    .wave {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .root {
      padding-left: 1rem;
    }

    .map {
      display: none;
    }
  }
</style>
