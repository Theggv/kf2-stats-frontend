<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import { tickToTime } from '../../utils';
  import type { HuskRageEventPayload } from '../../MatchDemoPlayer.data';

  export let offset: number;
  export let event: HuskRageEventPayload;
  export let profile: UserProfile | undefined;
</script>

<div class="root">
  <div class="time">{tickToTime(event.tick - offset, true)}</div>
  <div class="name">
    {profile?.name} raged {event.count}
    {event.count > 1 ? 'Fleshpounds' : 'Fleshpound'} by husk
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

    background-color: rgb(238 128 34 / 0.1);
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

  .name:after {
    content: '\1F480';
    padding-left: 0.25rem;
  }
</style>
