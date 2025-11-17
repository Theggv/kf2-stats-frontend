<script lang="ts">
  import type { Match } from '$lib/api/matches';

  export let data: Match;
  export let index = 0;

  $: details = data.details as Required<Match['details']>;
</script>

<a
  class="root"
  href="/sessions/{data.session.id}"
  target="_blank"
  rel="noopener noreferrer"
>
  <div class="primary">
    {details.map.name}
  </div>
  <div class="secondary">
    {details.server.name}
  </div>
</a>

<style>
  .root {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    width: 250px;
  }

  .primary {
    color: var(--text-primary);
  }

  .secondary {
    color: var(--text-secondary);
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
