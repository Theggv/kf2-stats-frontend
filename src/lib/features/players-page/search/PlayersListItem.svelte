<script lang="ts">
  import { Mode, Status } from '$lib/api/sessions';
  import type {
    FilterUsersResponseUser,
    FilterUsersResponseUserSession,
  } from '$lib/api/users';
  import Player from '$lib/components/player/Player.svelte';
  import { getWaveText } from '$lib/util/converters';
  import { diffToString, modeToString } from '$lib/util/enum-to-text';

  export let data: FilterUsersResponseUser;

  $: session = data.current_session ? data.current_session : data.last_session;
  $: isOnline =
    (new Date().getTime() - new Date(data.updated_at).getTime()) / 1000 < 60;

  function getMatchClass(session?: FilterUsersResponseUserSession) {
    if (!session) return '';
    if (session.status === Status.InProgress) return 'in-progress';

    if (session.mode === Mode.Endless) return '';

    if (session.status === Status.Lose) return 'lose';
    if (session.status === Status.Win) return 'win';

    return '';
  }
</script>

<div class="root {getMatchClass(session)}">
  <div class="time">
    {new Date(data.updated_at).toLocaleTimeString()}
  </div>

  <div class="player">
    <Player {data} newTab online={isOnline} compact />
  </div>

  {#if session}
    <div class="settings">
      <div class="title list">
        <span>
          {modeToString(session.mode, false)}
        </span>
        {#if session?.mode !== Mode.Endless}
          <span>
            ({session?.length} Waves)
          </span>
        {/if}
      </div>
      <div class="list">
        {#if session.cd_data}
          <span>
            {session.cd_data.spawn_cycle}
          </span>
          <span>
            {session.cd_data.max_monsters}mm
          </span>
          {#if session.cd_data.zeds_type.toLowerCase() !== 'vanilla'}
            <span>
              {session.cd_data.zeds_type.toLowerCase()} zeds
            </span>
          {/if}
        {:else}
          <span>
            {diffToString(session.diff)}
          </span>
        {/if}
      </div>
    </div>

    <div class="container-end">
      <div class="wave">
        <div class="title">Wave</div>
        <div>
          {getWaveText(session.wave, session)}
        </div>
      </div>
    </div>
  {/if}
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
    min-height: 3rem;
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

  .player {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 275px;
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

  @media (max-width: 768px) {
    .root {
      padding-left: 1rem;
    }

    .settings,
    .wave {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .player {
      min-width: 200px;
      width: 200px;
      overflow: hidden;
    }
  }

  @media (max-width: 1024px) {
    .settings {
      width: 200px;
    }
  }
</style>
