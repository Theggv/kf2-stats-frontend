<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import { lineHoverPlugin } from '$lib/components/charts';
  import type { ZedGroups } from '$lib/api/common';

  export let labels: string[];
  export let datasets: ZedGroups[];

  function tooltipLabel(context: any) {
    const value = context.parsed.y ?? 0;

    return `${context.dataset.label}: ${value.toFixed(1)}%`;
  }
</script>

<div class="line-chart">
  {#if datasets.length}
    <Line
      plugins={[lineHoverPlugin]}
      options={{
        animation: {
          duration: 0,
        },
        maintainAspectRatio: false,
        resizeDelay: 0,
        interaction: {
          mode: 'x',
          intersect: true,
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
        elements: {
          point: {
            pointStyle: 'circle',
            hoverRadius: 3,
            hoverBorderWidth: 5,
            radius: 0,
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Zeds Distribution',
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
            mode: 'index',
            intersect: false,
            yAlign: 'bottom',
            position: 'nearest',
            caretPadding: 8,
            callbacks: { label: tooltipLabel },
          },
        },
      }}
      data={{
        xLabels: labels,
        datasets: [
          {
            label: 'Trash',
            data: datasets.map((x) => (x.trash / (x.total || 1)) * 100),
            fill: false,
            borderColor: '#3a3a',
            tension: 0.25,
            borderWidth: 2,
          },
          {
            label: 'Medium',
            data: datasets.map((x) => (x.medium / (x.total || 1)) * 100),
            fill: false,
            borderColor: '#da4a',
            tension: 0.25,
            borderWidth: 2,
          },
          {
            label: 'Large',
            data: datasets.map((x) => (x.large / (x.total || 1)) * 100),
            fill: false,
            borderColor: '#c66a',
            tension: 0.25,
            borderWidth: 2,
          },
        ],
      }}
    />
  {:else}
    <div class="secondary">No Data</div>
  {/if}
</div>

<style>
  .line-chart {
    padding: 0;
    flex: 1;
    display: flex;
  }

  .secondary {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--text-secondary);
  }

  :global(.line-chart > canvas) {
    max-width: 100%;
    max-height: 150px;
    min-height: 150px;
  }
</style>
