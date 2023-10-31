<script lang="ts">
  import {
    ServerAnalyticsApiService,
    TimePeriod,
    type PeriodData,
  } from '$lib/api/analytics';
  import { Bar } from 'svelte-chartjs';
  import { writable } from 'svelte/store';
  import { normalizeData } from './store';
  import ChartLayout from './ChartLayout.svelte';
  import { backgroundColor } from './chart-data';

  export let serverId: number;

  const now = new Date();
  const year = new Date().setUTCFullYear(now.getUTCFullYear(), 0, 1);
  const month = new Date().setUTCFullYear(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    1
  );
  const week = now.getTime() - 604800 * 1000;

  const options = [
    {
      title: 'Year',
      date_from: new Date(year),
      date_to: new Date(),
      period: TimePeriod.Month,
    },
    {
      title: 'Month',
      date_from: new Date(month),
      date_to: new Date(),
      period: TimePeriod.Day,
    },
    {
      title: 'Week',
      date_from: new Date(week),
      date_to: new Date(),
      period: TimePeriod.Week,
    },
    {
      title: 'Today',
      date_from: new Date(),
      date_to: new Date(),
      period: TimePeriod.Hour,
    },
  ];

  const selectedOption = writable(2);

  function onClickOption(index: number) {
    selectedOption.set(index);
  }

  const data = writable<PeriodData[]>([]);

  $: normalizedData = normalize($data);

  async function fetch() {
    const { title, ...params } = options[$selectedOption];

    try {
      const { data: res } = await ServerAnalyticsApiService.getSessionCount({
        server_id: serverId,
        ...params,
      });

      data.set(res.items);
    } catch (error) {}
  }

  selectedOption.subscribe(() => fetch());

  function normalize(data: PeriodData[]) {
    const option = options[$selectedOption];

    return normalizeData(option.date_from, option.date_to, option.period, data);
  }
</script>

<ChartLayout>
  <svelte:fragment slot="title">Session Count</svelte:fragment>
  <svelte:fragment slot="tabs">
    <ul>
      {#each options as option, index (option.title)}
        <li class:selected={$selectedOption === index}>
          <div
            on:click={() => onClickOption(index)}
            on:keypress={(e) => e.code === 'Enter' && onClickOption(index)}
            role="button"
            tabindex="0"
          >
            {option.title}
          </div>
        </li>
      {/each}
    </ul>
  </svelte:fragment>
  <svelte:fragment slot="chart">
    {#if normalizedData.length}
      <Bar
        options={{ responsive: true }}
        data={{
          labels: normalizedData.map((x) => x.label),
          datasets: [
            {
              data: normalizedData.map((x) => x.count),
              label: 'Games played',
              backgroundColor,
            },
          ],
        }}
      />
    {:else}
      No results
    {/if}
  </svelte:fragment>
</ChartLayout>

<style>
  ul {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  li {
    font-weight: bold;
  }

  .selected {
    border-bottom: 2px solid var(--text-primary);
  }
</style>
