<div class="root {$$restProps.class || ''}">
  <slot />
</div>

<style>
  .root {
    flex: 1;
    padding-right: 0.5rem;
    overflow-y: auto;
  }

  @media (min-width: 768px) {
    .root::-webkit-scrollbar {
      width: 12px;
    }

    .root::-webkit-scrollbar-track {
      border-radius: 100px;
      background-color: rgb(212 212 212);
    }

    .root::-webkit-scrollbar-thumb {
      border-radius: 100px;
      background-color: #9ca3af;
    }
  }
</style>
