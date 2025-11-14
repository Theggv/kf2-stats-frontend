<script lang="ts">
  import type { GetLastSeenUsersResponseItem } from '$lib/api/analytics';

  export let data: GetLastSeenUsersResponseItem;
  export let index = 0;
</script>

<a
  class="root"
  href="/sessions/{data.session.id}"
  target="_blank"
  rel="noopener noreferrer"
>
  <div class="primary">
    {data.map.name}
  </div>
  <div class="secondary">
    {data.server.name}
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
