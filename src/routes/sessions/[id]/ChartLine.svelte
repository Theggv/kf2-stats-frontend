<script lang="ts">
  import { Line } from 'svelte-chartjs';

  type Data = { wave: number; attempt: number; value?: number };

  export let data: Data[];
  export let label: string;
  export let maxValue: number | undefined = undefined;
  export let beginAtZero: boolean = false;
  export let tooltip: ((value: number) => string) | undefined = undefined;

  $: convertedData = data.map((x) => x.value!);

  function formatLabel(data: Data) {
    if (data.attempt > 1) return `Wave ${data.wave} (${data.attempt})`;
    return `Wave ${data.wave}`;
  }
</script>

<div class="root">
  <Line
    options={{
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero,
          max: maxValue,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => {
              let label = ctx.dataset.label || '';
              if (label) label += ': ';

              if (tooltip) {
                label += tooltip(ctx.parsed.y);
              } else {
                label += ctx.parsed.y;
              }

              return label;
            },
          },
        },
      },
    }}
    data={{
      xLabels: data.map(formatLabel),
      datasets: [
        {
          label,
          data: convertedData,
          fill: false,
          borderColor: 'rgb(212 212 212 / 0.9)',
          tension: 0.2,
        },
      ],
    }}
  />
</div>

<style>
  .root {
    display: flex;
    min-width: 200px;
    max-width: 500px;
  }
</style>
