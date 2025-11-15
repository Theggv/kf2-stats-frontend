<script lang="ts">
  import { formatDate } from '$lib/util/date';
  import type { Match } from '../common';

  export let date: string;
  export let games: Match[];
</script>

<div class="root">
  <div class="title">
    {formatDate(date)}
  </div>
  <div class="secondary">
    {games.length} matches
  </div>
</div>

<style>
  .root {
    position: sticky;
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

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }
</style>
