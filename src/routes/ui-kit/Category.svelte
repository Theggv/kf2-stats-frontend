<script lang="ts">
  export let title: string;
  export let flex = false;
</script>

<div class="root" class:flex>
  <h1>{title}</h1>
  <slot />
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: 1rem;
  }

  .flex {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  h1 {
    font-size: 20px;
    font-weight: bold;
    grid-column: span 2;
  }
</style>
