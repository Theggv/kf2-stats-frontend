<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import type { DemoRecordAnalysisWaveKill } from '$lib/api/sessions/demo';
  import { getZedName, tickToTime } from './utils';

  export let event: DemoRecordAnalysisWaveKill;
  export let user: UserProfile | undefined;
</script>

<div
  class="root"
  class:medium={[10, 11, 12].includes(event.zed)}
  class:large={[7, 8, 9].includes(event.zed)}
>
  <div class="time">{tickToTime(event.tick, true)}</div>
  <div class="name">{user?.name}</div>
  <div class="zed">{getZedName(event.zed)}</div>
</div>

<style>
  .root {
    padding: 0.25rem 0.5rem;
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

  .zed {
    justify-self: flex-end;
  }

  .medium {
    font-weight: bold;
    background-color: rgba(225, 175, 109, 0.2);
  }

  .large {
    font-weight: bold;
    background-color: rgba(218, 84, 70, 0.2);
  }
</style>
