<script lang="ts">
  import { AutoScroll } from '$lib/components/auto-scroll';
  import ActivityCalendarKit from './ActivityCalendarKit.svelte';
</script>

<AutoScroll>
  <div class="root">
    <ActivityCalendarKit />
  </div>
</AutoScroll>

<style>
  .root {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
