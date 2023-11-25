<script lang="ts">
  import type { AccuracyHistItem } from '$lib/api/analytics';
  import { Line } from 'svelte-chartjs';
  import { writable } from 'svelte/store';
  import { lineHoverPlugin } from '../common/line-hover-plugin';

  export let data: AccuracyHistItem[] = [];

  const tabs = ['Overall', 'HS'];
  const selectedTab = writable(0);

  $: normalized = data
    .filter((x) => x.accuracy || x.hs_accuracy)
    .flatMap((x, _, arr) => (arr.length === 1 ? [x, x] : x));
</script>

<div class="perks-accuracy-root">
  {#if data.length}
    <ul>
      {#each tabs as tab, index (tab)}
        <li class:selected={$selectedTab === index}>
          <div
            on:click={() => selectedTab.set(index)}
            on:keypress={(e) => e.code === 'Enter' && selectedTab.set(index)}
            role="button"
            tabindex="0"
          >
            {tab}
          </div>
        </li>
      {/each}
    </ul>
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
  .perks-accuracy-root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .perks-accuracy-root > ul {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    font-weight: bold;
  }

  .perks-accuracy-root > ul > li {
    border-bottom: 2px solid transparent;
  }

  .perks-accuracy-root > ul > .selected {
    border-bottom-color: var(--text-primary);
  }

  :global(.perks-accuracy-root > canvas) {
    max-width: 100%;
    max-height: 200px;
    min-height: 200px;
  }
</style>
