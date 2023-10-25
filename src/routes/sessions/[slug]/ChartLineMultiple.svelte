<script lang="ts">
  import { Line } from 'svelte-chartjs';

  type Data = {
    wave: number;
    attempt: number;
    value?: number;
  };

  type PlayerData = {
    name: string;
    values: Data[];
  };

  export let data: PlayerData[];
  export let maxValue: number | undefined = undefined;
  export let beginAtZero: boolean = false;
  export let tooltip: ((value: number) => string) | undefined = undefined;

  function formatLabel(data: Data) {
    if (data.attempt > 1) return `Wave ${data.wave} (${data.attempt})`;
    return `Wave ${data.wave}`;
  }

  function prepareData(data: PlayerData) {
    return data.values.map((x) => x.value!);
  }

  $: xLabels = data.length ? data[0].values.map(formatLabel) : [];
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
      xLabels,
      datasets: data.map((dataset) => ({
        label: dataset.name,
        data: prepareData(dataset),
        fill: false,
        borderColor: 'rgb(212 212 212 / 0.9)',
        tension: 0.2,
      })),
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
