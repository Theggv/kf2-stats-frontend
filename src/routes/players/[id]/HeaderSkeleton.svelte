<div class="root">
  <div class="item">
    <div class="h-10 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 bg-slate-200 rounded animate-pulse" />
    <div />
    <div class="h-6 bg-slate-200 rounded animate-pulse" />
  </div>
</div>

<style>
  .root {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem 2rem;
    opacity: 0.5;
  }

  @media (max-width: 1280px) {
    .root {
      gap: 1rem 1rem;
    }
  }

  .item {
    flex: 1;
    display: grid;
    grid-template-columns: 40px 200px 1fr 250px;
    gap: 1rem;
    align-items: center;
  }
</style>
