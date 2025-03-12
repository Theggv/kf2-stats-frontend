<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import type { HealthEventPayload } from '../../MatchDemoPlayer.data';
  import { tickToTime } from '../../utils';

  export let offset: number;
  export let event: HealthEventPayload;
  export let profile: UserProfile | undefined;
</script>

<div class="root">
  <div class="time">{tickToTime(event.tick - offset, true)}</div>
  <div class="name">
    {profile?.name}
    <span>{event.old_value}HP</span>
    <span>-></span>
    <span>{event.new_value}HP</span>
    <span>({event.new_value - event.old_value}HP)</span>
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
  }
</style>
