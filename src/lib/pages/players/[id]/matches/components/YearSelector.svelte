<script lang="ts">
  export let year: number;

  let currentYear = new Date().getFullYear();

  function handleUpdateYear(plus: boolean) {
    if (plus) {
      year = Math.min(year + 1, currentYear);
    } else {
      year = Math.max(year - 1, 0);
    }
  }
</script>

<div class="periods">
  {year}
  <div>
    <button class:disabled={year <= 0} on:click={() => handleUpdateYear(false)}>
      &lt;
    </button>
    <button
      disabled={year >= currentYear}
      on:click={() => handleUpdateYear(true)}
    >
      &gt;
    </button>
  </div>
</div>

<style>
  .periods {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 0.5rem;

    align-self: flex-start;
    font-size: 16px;
  }

  .periods button {
    font-size: 20px;
  }

  .periods button:disabled {
    opacity: 0.5;
  }
</style>
