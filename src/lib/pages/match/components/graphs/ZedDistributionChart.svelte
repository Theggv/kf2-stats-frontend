<script lang="ts">
  import { Pie } from 'svelte-chartjs';
  import type { ZedGroups } from '$lib/api/common';

  export let data: ZedGroups;
  export let title = 'Zeds Distribution';

  function tooltipLabel(context: any) {
    const value = context.parsed ?? 0;

    return `${value.toFixed(1)}%`;
  }
</script>

<div class="pie-time-chart">
  <Pie
    options={{
      maintainAspectRatio: false,
      resizeDelay: 0,
      plugins: {
        title: {
          display: true,
          text: title,
          color: 'rgb(212 212 212 / 0.65)',
          font: {
            size: 14,
          },
        },
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: { label: tooltipLabel },
        },
      },
    }}
    data={{
      labels: ['Trash', 'Medium', 'Large'],
      datasets: [
        {
          data: [
            (data.trash / (data.total || 1)) * 100,
            (data.medium / (data.total || 1)) * 100,
            (data.large / (data.total || 1)) * 100,
          ],
          backgroundColor: ['#3a3a', '#da4a', '#c66a'],
        },
      ],
    }}
  />
</div>

<style>
  .pie-time-chart {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  :global(.pie-time-chart > canvas) {
    max-width: 100%;
    max-height: 200px;
    min-height: 200px;
  }
</style>
