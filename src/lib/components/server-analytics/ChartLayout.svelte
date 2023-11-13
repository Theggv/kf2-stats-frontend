<script lang="ts">
  export let chartSize: 'small' | 'normal' = 'normal';
</script>

<div class="root">
  <h2><slot name="title" /></h2>
  <slot name="tabs" />

  <div class="chart {chartSize}">
    <slot name="chart" />
  </div>
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chart {
    align-self: center;
    text-align: center;
  }

  .normal {
    width: 400px;
  }

  .small {
    width: 300px;
  }

  h2 {
    font-size: 18px;
    margin-bottom: 0.5rem;
    text-align: center;
    font-weight: bold;
  }
</style>
