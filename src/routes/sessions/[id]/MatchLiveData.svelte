<script lang="ts">
  import type { GetMatchLiveDataResponse } from '$lib/api/matches';
  import { Status } from '$lib/api/sessions';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import Player from '$lib/components/player/Player.svelte';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { perkToString } from '$lib/util/enum-to-text';
  import CurrentMatch from './CurrentMatch.svelte';
  import type { Match } from './store';

  export let data: GetMatchLiveDataResponse;
  export let match: Match;

  $: started = data.status === Status.InProgress;
</script>

<AutoScroll>
  <div class="root">
    <div class="session">
      <CurrentMatch {match} />
      {#if started}
        <div class="game-info">
          Wave {data.game_data.wave},
          {#if data.game_data.is_trader_time}
            Trader Time
          {:else}
            {data.game_data.zeds_left} Zeds Left
          {/if}
        </div>
      {/if}
    </div>
    <div class="players" class:started>
      <div class="player header">
        <div>
          <span>Players</span>
          <span>
            ({data.game_data.players_online} / {data.game_data.max_players})
          </span>
        </div>
        <div class="perk">Perk</div>
        <div class="health">Health</div>
        <div class="armor">Armor</div>
      </div>
      {#each data.players as item (item.id)}
        <div class="player">
          <Player data={item} compact />
          <div class="perk">
            <PerkIcon perk={item.perk} prestige={item.prestige} />
            <span>{item.level} {perkToString(item.perk)}</span>
          </div>
          {#if started}
            <progress class="health" max="100" value={item.health} />
            <progress class="armor" max="100" value={item.armor} />
          {/if}
        </div>
      {:else}
        <div class="player">No players on the server</div>
      {/each}
    </div>
    <div class="players" class:started>
      <div class="player header">
        <div>Spectators ({data.spectators.length})</div>
      </div>
      {#each data.spectators as item (item.id)}
        <div class="player">
          <Player data={item} compact />
        </div>
      {/each}
    </div>
  </div>
</AutoScroll>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header {
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid var(--text-secondary);
  }

  .session {
    flex: 1;
    display: grid;
    grid-template-columns: auto 1fr;
    font-weight: bold;
    gap: 2rem;
  }

  .session .game-info {
    justify-self: right;
    text-wrap: nowrap;
  }

  .players {
    display: flex;
    flex-direction: column;
    border: 2px solid var(--text-secondary);
    border-radius: 0.5rem;
  }

  .player {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 1fr 1fr 1fr;
    align-items: center;
    gap: 1rem;
    padding: 0.4rem 1rem;
  }

  .player:last-child {
    border-bottom: none;
  }

  .player .perk {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    text-wrap: nowrap;
  }

  .player .perk,
  .player .armor,
  .player .health {
    justify-self: center;
  }

  @media (max-width: 1280px) {
    progress {
      max-width: 100px;
    }
  }

  progress.armor {
    color: var(--armor-color);
  }

  progress.armor::-moz-progress-bar {
    background: var(--armor-color);
  }

  progress.armor::-webkit-progress-value {
    background: var(--armor-color);
  }
</style>
