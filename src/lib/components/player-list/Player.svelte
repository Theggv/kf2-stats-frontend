<script lang="ts">
  import type { FilterUsersResponseUser } from '$lib/api/users';

  export let item: FilterUsersResponseUser;

  $: session = item.current_session ? item.current_session : item.last_session;
  $: isLive = !!item.current_session;
</script>

<div class="root">
  <div>{item.name}</div>
  <div class="session" class:live={isLive}>
    {#if session}
      {session.server_name} ({session.map_name})
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

  .session {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .live.session::before {
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 100px;
    background-color: var(--color-online);
  }
</style>
