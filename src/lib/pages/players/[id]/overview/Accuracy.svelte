<script lang="ts">
  import type { AccuracyHistItem } from '$lib/api/analytics';
  import { Line } from 'svelte-chartjs';
  import { writable } from 'svelte/store';
  import { lineHoverPlugin } from '../common/line-hover-plugin';
  import { Tabs } from '$lib/components/tabs';

  export let data: AccuracyHistItem[] = [];

  const tabs = ['Overall', 'HS'];
  const selectedTab = writable(0);

  $: normalized = data
    .filter((x) => x.accuracy || x.hs_accuracy)
    .flatMap((x, _, arr) => (arr.length === 1 ? [x, x] : x));
</script>

<div class="overview-accuracy-root">
  {#if data.length}
    <Tabs {tabs} bind:selectedTab={$selectedTab} />

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
        scales: {
          x: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            yAlign: 'center',
            caretPadding: 8,
            callbacks: {
              label: (context) => {
                const value = context.parsed.y ?? 0;

                return `${value.toFixed(1)}%`;
              },
            },
          },
        },
      }}
      data={{
        xLabels: normalized.map((x) => new Date(x.period).toLocaleDateString()),
        datasets: [
          {
            label: '%',
            data: normalized.map(
              (x) => ($selectedTab === 0 ? x.accuracy : x.hs_accuracy) * 100
            ),
            fill: false,
            borderColor: 'rgb(200 200 120 / 0.9)',
            tension: 0.2,
          },
        ],
      }}
    />
  {/if}
</div>

<style>
  .overview-accuracy-root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  :global(.overview-accuracy-root > canvas) {
    max-width: 100%;
    max-height: 100px;
    min-height: 100px;
  }
</style>
