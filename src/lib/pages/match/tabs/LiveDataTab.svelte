<script lang="ts">
  import { Status } from '$lib/api/sessions';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import Player from '$lib/components/player/Player.svelte';
  import { PerkIcon } from '$lib/ui/icons';
  import { perkToString } from '$lib/util/enum-to-text';
  import { getContext } from 'svelte';
  import CurrentMatch from '../components/match-header/CurrentMatch.svelte';
  import { type ContextType, ContextName } from '../store';

  const store = getContext<ContextType>(ContextName);
  const { overview, live } = store.match;

  $: started = !!$live && $live.status === Status.InProgress;
</script>

<div class="root">
  {#if $overview && $live}
    <div class="session">
      <CurrentMatch match={$overview} />

      {#if started}
        <div class="game-info">
          Wave {$live.game_data.wave},
          {#if $live.game_data.is_trader_time}
            Trader Time
          {:else}
            {$live.game_data.zeds_left} Zeds Left
          {/if}
        </div>
      {/if}
    </div>

    <AutoScroll class="match-live-data-container">
      <div class="players" class:started>
        <div class="player header">
          <div>
            <span>Players</span>
            <span>
              ({$live.game_data.players_online} / {$live.game_data.max_players})
            </span>
          </div>
          <div class="perk">Perk</div>
          <div class="health">Health</div>
          <div class="armor">Armor</div>
        </div>
        {#each $live.players as item (item.id)}
          <div class="player">
            <Player profile={item} compact />
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
          <div>Spectators ({$live.spectators.length})</div>
        </div>
        {#each $live.spectators as item (item.id)}
          <div class="player">
            <Player profile={item} compact />
          </div>
        {/each}
      </div>
    </AutoScroll>
  {/if}
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .header {
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid var(--text-secondary);
  }

  :global(.match-live-data-container) {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .session {
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
    grid-template-columns: minmax(100px, 200px) 3fr 2fr 2fr;
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
    justify-self: left;
  }

  .player.header .perk {
    padding-left: 1rem;
  }

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
