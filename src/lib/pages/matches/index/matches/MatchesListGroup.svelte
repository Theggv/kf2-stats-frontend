<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import { formatDate } from '$lib/util/date';

  export let date: string;
  export let items: Match[];
</script>

<div class="root">
  <div class="title">
    {formatDate(date)}
  </div>
  <div class="secondary">
    {items.length} matches
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
