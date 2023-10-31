<script lang="ts">
  import type { FilterUsersResponseUser } from '$lib/api/users';

  export let item: FilterUsersResponseUser;
</script>

<div class="root">
  <div>{item.name}</div>
  <div>
    {#if item.current_session}
      current session
    {:else if item.last_session}
      {item.last_session.server_name} ({item.last_session.map_name})
    {:else}
      -
    {/if}
  </div>
  <div class="last-update">
    {new Date(item.updated_at).toLocaleString()}
  </div>
</div>

<style>
  .root {
    margin: 0.5rem;
    display: grid;
    grid-template-columns: 200px 1fr max-content;
    gap: 0.5rem;
  }

  .last-update {
    text-align: right;
  }
</style>
