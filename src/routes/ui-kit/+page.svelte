<script lang="ts">
  import { AutoScroll } from '$lib/components/auto-scroll';
  import { DifficultyIcon } from '$lib/ui/icons';
  import ActivityCalendarKit from './ActivityCalendarKit.svelte';

  let tests = [
    0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 8.5, 9.5, 10.5, 12, 15, 20,
  ];
</script>

<AutoScroll>
  <div class="root">
    {#each tests as test}
      <DifficultyIcon difficulty={test} />
    {/each}
  </div>
</AutoScroll>

<style>
  .root {
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
</style>
