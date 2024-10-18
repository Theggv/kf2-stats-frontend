<script lang="ts">
  import type { GetTeammatesResponseItem } from '$lib/api/analytics';
  import Player from '$lib/components/player/Player.svelte';

  export let data: GetTeammatesResponseItem[] = [];
</script>

<div class="root">
  {#each data as player (player.id)}
    <div class="player">
      <Player profile={player} compact bold />
      <div class="matches">
        <div>
          <span class="secondary">Matches:</span>
          {player.games}
        </div>
        <div>
          <span class="secondary">Winrate:</span>
          <span>{((100 * player.wins) / player.games).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .player {
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .matches {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-size: 14px;
  }

  .secondary {
    color: var(--text-secondary);
  }
</style>
