<script lang="ts">
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
</script>

<AutoScroll>
  <div class="root">Why are you here?</div>
</AutoScroll>

<style>
  .root {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h2 {
    font-weight: bold;
    justify-self: right;
  }
</style>
