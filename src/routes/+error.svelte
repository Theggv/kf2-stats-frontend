<script lang="ts">
  import { page } from '$app/stores';
</script>

<div>
  {#if $page.status === 503}
    <h1>Backend server is not available</h1>
  {:else}
    <h1>Something went wrong</h1>
    <span>
      <h2>{$page.status}</h2>
      <h2>{$page.error?.message}</h2>
    </span>
  {/if}
</div>

<style>
  div {
    padding: 1rem;
    padding-top: 4rem;
  }
  span {
    display: flex;
    gap: 1rem;
  }
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 20px;
  }
</style>
