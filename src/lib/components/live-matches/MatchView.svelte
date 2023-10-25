<script lang="ts">
  import { diffToString, modeToString } from '$lib/util/enum-to-text';

  import { page } from '$app/stores';
  import StyledLink from '$lib/ui/a/StyledLink.svelte';
  import type { MatchData } from '$lib/api/matches';
  import { Mode } from '$lib/api/sessions';
  import type { WithRequired } from '$lib/util/types';

  $: selected =
    $page.url.pathname.includes(`/sessions`) &&
    Number($page.params.slug) === match.session.session_id;

  export let match: WithRequired<MatchData, 'game_data' | 'server' | 'map'>;
</script>

<StyledLink
  href="/sessions/{match.session.session_id}"
  class="match-view-container"
  {selected}
>
  <div class="column">
    <div class="server-name">
      {match.server?.name}
    </div>

    <h4>Mode</h4>
    <div>
      {modeToString(match.session.mode)}
    </div>

    <h4>Players</h4>
    <div>
      {match.game_data.players_online} / {match.game_data.max_players}
    </div>
  </div>
  <div class="column">
    <h4>Map</h4>
    <div>{match.map?.name}</div>

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

    <h4>Wave</h4>
    <div>
      {#if match.session.mode !== Mode.Endless}
        {match.game_data.wave} / {match.session.length}
      {:else}
        {match.game_data.wave}
      {/if}
    </div>
  </div>
</StyledLink>

<style>
  :global(.match-view-container) {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
    user-select: none;
  }

  .column {
    display: grid;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
    justify-content: space-between;
    font-weight: bold;
    gap: 0 0.5rem;
  }

  .column h4 {
    font-size: 13px;
    color: var(--text-secondary);
  }

  .selected .column h4 {
    color: var(--text-primary);
  }

  .column > div {
    font-size: 16px;
  }

  .server-name {
    max-width: 250px;
    width: auto;
    word-wrap: normal;
    text-wrap: pretty;
    grid-row: 1 / span 2;
    align-self: center;
  }
</style>
