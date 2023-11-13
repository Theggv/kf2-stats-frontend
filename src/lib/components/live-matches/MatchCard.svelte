<script lang="ts">
  import { page } from '$app/stores';
  import StyledLink from '$lib/ui/a/StyledLink.svelte';
  import type { MatchData } from '$lib/api/matches';
  import { Mode } from '$lib/api/sessions';
  import type { WithRequired } from '$lib/util/types';
  import { dateDiff } from '$lib/util/date';
  import { getWaveText } from '$lib/util/converters';

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
  <div class="server">
    {match.server?.name}
  </div>
  <div class="map">
    {match.map?.name}
  </div>
  <div class="wave">
    {getWaveText(match.game_data.wave, match.session)}
  </div>
  <div class="game-length">
    {dateDiff(new Date(match.session.started_at), new Date())}
  </div>
</StyledLink>

<style>
  :global(.match-view-container) {
    display: grid;
    grid-template:
      'server server server' auto
      'map wave game-length' auto
      / 140px auto auto;

    gap: 0.25rem 0.5rem;
    padding: 0.5rem;
    user-select: none;
    font-size: 12px;
  }

  .server {
    grid-area: server;
    word-wrap: normal;
    text-wrap: pretty;
    font-weight: bold;
  }

  .map {
    overflow: hidden;
    grid-area: map;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    color: var(--text-secondary);
  }

  .wave {
    grid-area: wave;
    text-wrap: nowrap;
  }

  .game-length {
    grid-area: game-length;
    text-wrap: nowrap;
    text-align: right;
  }
</style>
