<div class="root">
  <slot name="header" class="header" />
  <hr />
  <slot name="content" />
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;

    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
