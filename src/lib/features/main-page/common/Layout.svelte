<script>
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
</script>

<AutoScroll>
  <div class="root">
    <div class="sidebar">
      <slot name="sidebar" />
    </div>
    <div class="content">
      <slot name="content" />
    </div>
  </div>
  <slot />
</AutoScroll>

<style>
  .root {
    flex: 1;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1rem;
  }

  .sidebar,
  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
