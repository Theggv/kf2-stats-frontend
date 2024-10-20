<script lang="ts">
  import type { LeaderBoardsResponseItem } from '$lib/api/leaderboards';
  import Player from '$lib/components/player/Player.svelte';

  export let index: number;
  export let data: LeaderBoardsResponseItem;

  function getPlaceColor(place: number) {
    if (place === 1) return 'first';
    if (place === 2) return 'second';
    if (place === 3) return 'third';
    return '';
  }
</script>

<div class="root {getPlaceColor(index + 1)}">
  <div class="index">
    {index + 1}
  </div>

  <div class="player">
    <Player profile={data} newTab compact />
  </div>
</div>

<style>
  :root {
    --color-first: gold;
    --color-second: silver;
    --color-third: #cd7f32;
  }

  .root {
    position: relative;
    display: grid;
    grid-template-columns: 2rem 1fr;
    align-items: center;
    gap: 0.5rem;

    padding: 0 0.25rem;
    padding-left: 2rem;

    font-weight: bold;
    height: 48px;
  }

  .root:nth-child(odd) {
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.2));
  }

  .root:nth-child(even) {
    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.3));
  }

  .index {
    color: var(--text-secondary);
    display: flex;
  }

  .player {
    padding: 0.25rem;
    overflow: hidden;
  }

  .root::before {
    position: absolute;

    content: '';
    left: 0;
    width: 3px;
    top: 0.25rem;
    bottom: 0.25rem;
  }

  .root.first::before {
    background: var(--color-first);
  }

  .root.second::before {
    background: var(--color-second);
  }

  .root.third::before {
    background: var(--color-third);
  }

  .title,
  .value {
    white-space: nowrap;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    .root {
      grid-template-columns: 2ch 1fr;
      padding-left: 1rem;
    }

    .player {
      padding: 0;
    }
  }
</style>
