<script lang="ts">
  import { Line } from 'svelte-chartjs';
  import { lineHoverPlugin } from './line-hover-plugin';

  type Data = {
    label: string;
    value: number | undefined;
  };

  export let label = '';
  export let borderColor = 'rgb(200 200 200 / 0.9)';
  export let data: Data[];
  export let tooltop: (value: number) => string;

  $: values = data.map((x) => x.value as any);
</script>

<div class="root">
  {#if data.length}
    <Line
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
            fill: false,
            borderColor,
            tension: 0.2,
          },
        ],
      }}
    />
  {/if}
</div>

<style>
  .root {
    flex: 1;
    display: flex;
  }
</style>
