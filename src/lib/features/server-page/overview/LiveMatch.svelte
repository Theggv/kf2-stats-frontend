<script lang="ts">
  import Player from '$lib/components/player/Player.svelte';
  import PlayerWithPerk from '$lib/components/player/PlayerWithPerk.svelte';
  import { getStore } from './LiveMatch.store';

  export let serverId: number;

  const { serverIdStore, liveData } = getStore();
  $: serverIdStore.set(serverId);
</script>

<div class="root">
  {#if $liveData}
    {#each $liveData.players as player (player.id)}
      <PlayerWithPerk
        profile={{
          id: player.id,
          name: player.name,
          profile_url: player.profile_url,
          avatar: player.avatar,
        }}
        playerData={{
          perk: player.perk,
          level: player.level,
          prestige: player.prestige,
          is_dead: player.health <= 0,
        }}
      />
    {:else}
      <div class="secondary">No players on the server</div>
    {/each}

    {#if $liveData.spectators.length}
      <div class="title secondary">Spectators</div>

      {#each $liveData.spectators as player (player.id)}
        <div class="spectator">
          <Player profile={player} compact />
        </div>
      {/each}
    {/if}
  {:else}
    <div class="secondary">No players on the server</div>
  {/if}
</div>

<style>
  .root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
  }

  .title {
    padding: 0.5rem 0;
  }

  .spectator {
    padding: 0.25rem 0;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }
</style>
