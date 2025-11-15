<script lang="ts">
  import { GameStatus } from '$lib/api/sessions';
  import type { Match } from '$lib/api/matches/filter';

  export let date: string;
  export let matches: Match[];

  $: gamesWon = matches.filter(
    (x) => x.session.status === GameStatus.Win
  ).length;

  $: gamesLost = matches.length - gamesWon;

  function formatDate(str: string) {
    return new Date(str).toLocaleString('en', {
      day: 'numeric',
      month: 'long',
    });
  }
</script>

<div class="root">
  <div class="title">
    {formatDate(date)}
  </div>
  <div class="title list">
    <div>
      <span>{gamesWon}</span>
      <span class="win">W</span>
    </div>
    <div>
      <span>{gamesLost}</span>
      <span class="lose">L</span>
    </div>
  </div>
</div>

<style>
  .root {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: center;
    padding: 0.5rem;
    padding-left: 2rem;
    font-weight: bold;
    background: rgba(200, 200, 250, 0.15);
  }

  .title {
    font-size: 20px;
  }

  .list,
  .list > * {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }

  .list > *::after {
    font-size: 12px;
    content: '—';
    color: var(--text-secondary);
  }

  .list > *:last-child::after {
    display: none;
    margin: 0;
  }

  .win {
    color: var(--color-win);
  }

  .lose {
    color: var(--color-lose);
  }
</style>
