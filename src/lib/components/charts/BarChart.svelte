<script lang="ts">
  import { Bar } from 'svelte-chartjs';
  import { lineHoverPlugin } from './plugins';
  import { barBackgroundColors } from './colors';

  type Data = {
    label: string;
    value: number | undefined;
  };

  export let label = '';
  export let data: Data[];
  export let tooltop: (value: number) => string;

  $: values = data.map((x) => x.value as any);
</script>

<div class="bar-chart">
  {#if data.length}
    <Bar
      plugins={[lineHoverPlugin]}
      options={{
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
          legend: {
            display: true,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            yAlign: 'center',
            caretPadding: 8,
            callbacks: {
              label: (context) => tooltop(context.parsed.y ?? 0),
            },
          },
        },
      }}
      data={{
        xLabels: data.map((x) => x.label),
        datasets: [
          {
            label,
            data: values,
            backgroundColor: barBackgroundColors,
          },
        ],
      }}
    />
  {:else}
    <div class="secondary">No Data</div>
  {/if}
</div>

<style>
  .bar-chart {
    flex: 1;
    display: flex;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }
</style>
