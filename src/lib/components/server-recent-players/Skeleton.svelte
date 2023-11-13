<div class="root">
  <div class="h-6 my-1 bg-slate-200 rounded animate-pulse ml-4 w-28" />
  <div class="item">
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-10 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
  </div>
  <div class="item">
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-10 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
  </div>
  <div class="item">
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-10 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
  </div>
  <div class="h-6 my-1 bg-slate-200 rounded animate-pulse ml-4 w-28" />
  <div class="item">
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-10 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
  </div>
  <div class="item">
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-10 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
    <div class="h-6 my-1 bg-slate-200 rounded animate-pulse" />
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
    grid-template-columns: 90px 40px 1fr 150px;
    gap: 1rem;
    align-items: center;
  }
</style>
