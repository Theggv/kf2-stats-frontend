<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import data from './mock.json';

  $: matches = data.items as Match[];
</script>

<AutoScroll>
  <div class="root">why are you here</div>
</AutoScroll>

<style>
  .root {
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
</style>
