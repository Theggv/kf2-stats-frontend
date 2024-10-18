<script lang="ts">
  export let difficulty: number;

  function getColor(difficulty: number) {
    if (difficulty <= 4) return '#3a3a';
    if (difficulty <= 6) return '#cc4a';
    if (difficulty <= 8) return '#fa4a';
    if (difficulty <= 9) return '#f66a';

    return '#d44a';
  }

  const arr = [, , , , , , , , , ,];
  $: rounded = Math.round(difficulty);
  $: color = getColor(rounded);
</script>

<div class="root">
  <div class="label">Match Difficulty</div>
  <div class="difficulty">
    {#each arr as _, index (index)}
      {#if rounded >= index + 1}
        <div class="cell" style="background-color: {color};" />
      {:else}
        <div class="cell" />
      {/if}
    {/each}
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .label {
    font-weight: bold;
    color: var(--text-secondary);
  }

  .difficulty {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 0.25rem;
  }

  .difficulty .cell {
    width: 8px;
    height: 12px;
    background-color: rgb(100 100 100 / 0.9);
  }
</style>
