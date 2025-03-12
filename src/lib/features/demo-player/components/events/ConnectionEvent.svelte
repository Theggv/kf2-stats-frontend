<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import { tickToTime } from '../../utils';

  export let offset: number;
  export let tick: number;
  export let type: number;
  export let profile: UserProfile | undefined;
</script>

<div class="root" class:died={type === 3}>
  <div class="time">{tickToTime(tick - offset, true)}</div>
  <div class="name" class:died={type === 3}>
    {profile?.name}
    {#if type === 1}
      joined the game
    {:else if type === 2}
      left the game
    {:else if type === 3}
      died
    {/if}
  </div>
</div>

<style>
  .root {
    padding: 0.25rem 0.25rem;
    display: grid;
    grid-template-columns: min-content auto;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
    border-radius: 0.25rem;
  }

  .root.died {
    background-color: rgba(218, 84, 70, 0.2);
  }

  .time {
    font-size: 12px;
    font-weight: bold;
  }

  .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .name.died:after {
    content: '\1F480';
    padding-left: 0.25rem;
  }
</style>
