<script lang="ts">
  import { Status } from '$lib/api/sessions';
  import type { FilterUsersResponseUser } from '$lib/api/users';
  import { getWaveText } from '$lib/util/converters';
  import { statusToString } from '$lib/util/enum-to-text';

  export let item: FilterUsersResponseUser;

  $: session = item.current_session ? item.current_session : item.last_session;
  $: isOnline = !!item.current_session;
</script>

<div class="time">
  {new Date(item.updated_at).toLocaleTimeString()}
</div>

<div class="player" class:online={isOnline}>
  <div class="avatar">
    <a href={item.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={item.avatar} alt="" />
    </a>
  </div>
  <a class="name" href="/players/{item.id}">{item.name}</a>
</div>

{#if session}
  <div class="session">
    <a href="/sessions/{session.id}">
      {session.server_name} ({session.map_name})
    </a>
  </div>

  <div class="wave">
    {getWaveText(session.wave, session)}
  </div>

  <div
    class="status"
    class:lost={session.status === Status.Lose}
    class:won={session.status === Status.Win}
    class:in-progress={session.status === Status.InProgress}
  >
    {statusToString(session.status)}
  </div>
{:else}
  <div />
  <div />
  <div />
{/if}

<style>
  .time {
    text-align: center;
    color: var(--text-secondary);
  }

  .player {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .player .avatar {
    position: relative;
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
  }

  .player .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }

  .online.player .avatar::after {
    position: absolute;
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 100px;
    background-color: darkgreen;
    bottom: -5px;
    right: -5px;
  }

  .player .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .session {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .wave,
  .status {
    text-align: center;
    font-weight: bold;
  }

  .lost {
    color: rgb(217, 100, 100);
  }

  .won {
    color: rgb(46, 158, 46);
  }

  .in-progress {
    color: rgb(184, 197, 68);
  }
</style>
