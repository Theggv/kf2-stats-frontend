<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import type { DemoRecordParsedEventBuff } from '$lib/api/sessions/demo';
  import { tickToTime } from '../../utils';

  export let offset: number;
  export let event: DemoRecordParsedEventBuff;
  export let profile: UserProfile | undefined;
</script>

<div class="root">
  <div class="time">{tickToTime(event.tick - offset, true)}</div>
  <div class="name">
    <span>{profile?.name}</span>
    {#if event.max_buffs > 0}
      <span>
        received {event.max_buffs}
        {event.max_buffs > 1 ? 'buffs' : 'buff'}
      </span>
    {:else}
      <span>lost buffs</span>
    {/if}
  </div>
</div>

<style>
  .root {
    padding: 0.25rem 0.25rem;
    display: grid;
    grid-template-columns: min-content auto auto;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
  }

  .time {
    font-size: 12px;
    font-weight: bold;
  }

  .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;

    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }
</style>
