<script lang="ts">
  import type { MajorEventsData } from '../../MatchDemoPlayer.data';

  export let offset: number;
  export let event: MajorEventsData['zedsLeft'];
</script>

<div class="root">
  <div>Zeds left: {event}</div>
</div>

<style>
  .root {
    text-align: right;
    font-size: 14px;
    font-weight: bold;
  }
</style>
