<div class="root">
  <slot name="header" class="header" />
  <slot name="content" />
  <slot />
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
