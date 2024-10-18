<script lang="ts">
  import type { UserAnalyticsResponse } from '$lib/api/analytics';
  import type { FilterUsersResponseUser } from '$lib/api/users';
  import Player from '$lib/components/player/Player.svelte';
  import { getTimeSinceNow } from '$lib/util/date';

  export let user: FilterUsersResponseUser;
  export let overview: UserAnalyticsResponse;

  $: online = !!user?.current_session;
</script>

<div class="header">
  <Player profile={user} {online} bold disableLink>
    {#if user.current_session}
      {@const session = user.current_session}
      <a href="/sessions/{session.id}" class="status">
        In-game: {session.server_name} ({session.map_name})
      </a>
    {/if}
  </Player>
  <div class="secondary">
    {#if !online}
      <div class="attr">
        <div class="list">
          {getTimeSinceNow(new Date(user.updated_at))}
        </div>
        <div class="title">Last Seen</div>
      </div>
    {/if}

    <div class="attr">
      <div class="list">
        <span>{overview.games}</span>
        <span class="win">{overview.wins}</span>
        <span class="lose">{overview.games - overview.wins}</span>
      </div>
      <div class="title">Matches</div>
    </div>

    {#if overview.games}
      <div class="attr">
        <div class="list">
          {Math.round((100 * overview.wins) / overview.games)}%
        </div>
        <div class="title">Winrate</div>
      </div>
    {/if}
  </div>
</div>

<style>
  .header,
  .header .secondary {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .header {
    justify-content: space-between;
  }

  .header .status {
    color: var(--text-secondary);
    font-weight: bold;
  }

  .secondary {
    font-weight: bold;
  }

  .attr {
    display: flex;
    flex-direction: column;
  }

  .attr .title {
    color: var(--text-secondary);
  }

  .win {
    color: var(--color-win);
  }

  .lose {
    color: var(--color-lose);
  }

  .list,
  .list > * {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }

  .list > *::after {
    font-size: 12px;
    content: '—';
    color: var(--text-secondary);
  }

  .list > *:last-child::after {
    display: none;
    margin: 0;
  }
</style>
