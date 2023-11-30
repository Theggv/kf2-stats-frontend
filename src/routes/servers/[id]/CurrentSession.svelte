<script lang="ts">
  import { onMount } from 'svelte';
  import {
    diffToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';
  import { MatchesApiService, type MatchData } from '$lib/api/matches';
  import type { WithRequired } from '$lib/util/types';
  import { getWaveText } from '$lib/util/converters';

  let refreshIntervalId: number;
  let match: WithRequired<MatchData, 'game_data' | 'map'>;

  onMount(() => {
    updateData();

    return () => clearInterval(refreshIntervalId);
  });

  function updateData() {
    clearInterval(refreshIntervalId);
    fetchData();
    refreshIntervalId = setInterval(fetchData, 15000);
  }

  async function fetchData() {
    try {
      await MatchesApiService.getLastServerMatch(serverId).then(
        ({ data }) => (match = data as any)
      );
    } catch (error) {}
  }

  export let serverId: number;
</script>

<div>
  {#if match}
    <div class="column">
      <div>
        <h4>Map</h4>
        <div>{match.map?.name}</div>
      </div>

      <div>
        <h4>Mode</h4>
        <div>
          {modeToString(match.session.mode)}
        </div>
      </div>

      <div>
        <h4>Difficulty</h4>
        <div>
          {#if !match.cd_data || !match.cd_data.spawn_cycle}
            {diffToString(match.session.diff)}
          {:else}
            <span>{match.cd_data.spawn_cycle}</span>
            <span>{match.cd_data.max_monsters}mm</span>
            {#if match.cd_data.zeds_type != 'vanilla'}
              <span>{match.cd_data.zeds_type} zeds</span>
            {/if}
          {/if}
        </div>
      </div>

      <div>
        <h4>Wave</h4>
        <div>
          {getWaveText(match.game_data.wave, match.session)}
        </div>
      </div>

      <div>
        <h4>Players</h4>
        <div>
          {match.game_data.players_online} / {match.game_data.max_players}
        </div>
      </div>

      <div>
        <h4>Status</h4>
        <div>
          {statusToString(match.session.status)}
        </div>
      </div>
    </div>
  {:else}
    <div>Current match is not found</div>
  {/if}
</div>

<style>
  .column {
    display: flex;
    flex-direction: row;
    font-weight: bold;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .column h4 {
    font-size: 13px;
    color: #9ca3af;
  }

  .selected .column h4 {
    color: #bfc4ce;
  }

  .column > div {
    font-size: 16px;
  }
</style>
