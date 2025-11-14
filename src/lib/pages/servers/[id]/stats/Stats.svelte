<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineLineChart, AiOutlineBarChart } from 'svelte-icons-pack/ai';
  import { FaSolidChartPie } from 'svelte-icons-pack/fa';
  import { RiBusinessBarChartHorizontalFill } from 'svelte-icons-pack/ri';

  import BarChart from '$lib/components/charts/BarChart.svelte';
  import BarTimeChart from '$lib/components/charts/BarTimeChart.svelte';
  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import type { ServerData } from '$lib/api/servers';

  import { getStore as getPlayersOnlineStore } from './charts/PlayersOnline';
  import { getStore as getSessionsPlayedStore } from './charts/SessionsPlayed';
  import { getStore as serverUsageStore } from './charts/ServerUsage';
  import { getStore as popularMapsStore } from './charts/PopularMaps';
  import { getStore as perkKillsStore } from './charts/PerkTotalKills';
  import { getStore as perkPlaytime } from './charts/PerkPlaytime';

  import {
    periodsWithoutWeek,
    serverUsagePeriods,
    popularMapsPeriods,
  } from './periods';
  import LineTimeChart from '$lib/components/charts/LineTimeChart.svelte';
  import PieTimeChart from '$lib/components/charts/PieTimeChart.svelte';
  import PerkChart from '$lib/components/charts/PerkTimeChart.svelte';
  import { iconSettings } from '$lib/ui/icons';

  export let server: ServerData;

  const { selectedPeriod: onlinePeriod, data: onlineData } =
    getPlayersOnlineStore(server.id, periodsWithoutWeek);

  const { selectedPeriod: sessionCountPeriod, data: sessionCountData } =
    getSessionsPlayedStore(server.id, periodsWithoutWeek);

  const { selectedPeriod: serverUsagePeriod, data: serverUsageData } =
    serverUsageStore(server.id, serverUsagePeriods);

  const { selectedPeriod: popularMapsPeriod, data: popularMapsData } =
    popularMapsStore(server.id, popularMapsPeriods);

  const { selectedPeriod: perkKillsPeriod, data: perkKillsData } =
    perkKillsStore(server.id, popularMapsPeriods);

  const { selectedPeriod: perkPlaytimePeriod, data: perkPlaytimeData } =
    perkPlaytime(server.id, popularMapsPeriods);
</script>

<ContentLayout>
  <svelte:fragment slot="sidebar">
    <SectionLayout>
      <svelte:fragment slot="title">Popular Maps</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={FaSolidChartPie} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <PieTimeChart
          data={$popularMapsData}
          periods={popularMapsPeriods}
          bind:selectedPeriod={$popularMapsPeriod}
        />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Kills By Perk</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={RiBusinessBarChartHorizontalFill} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <PerkChart
          tooltop={(x) => `${x} kills`}
          data={$perkKillsData}
          periods={popularMapsPeriods}
          bind:selectedPeriod={$perkKillsPeriod}
        />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Perks Playtime</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={RiBusinessBarChartHorizontalFill} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <PerkChart
          tooltop={(x) => (x === 1 ? '1 hour' : `${x} hours`)}
          data={$perkPlaytimeData}
          periods={popularMapsPeriods}
          bind:selectedPeriod={$perkPlaytimePeriod}
        />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <SectionLayout>
      <svelte:fragment slot="title">Unique Players Chart</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineLineChart} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <LineTimeChart
          bind:selectedPeriod={$onlinePeriod}
          data={$onlineData}
          periods={periodsWithoutWeek}
          label="Players"
        />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Sessions Count Chart</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineBarChart} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <LineTimeChart
          bind:selectedPeriod={$sessionCountPeriod}
          data={$sessionCountData}
          periods={periodsWithoutWeek}
          label="Sessions"
        />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Server Usage Chart</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineBarChart} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <LineTimeChart
          data={$serverUsageData}
          periods={serverUsagePeriods}
          bind:selectedPeriod={$serverUsagePeriod}
          label="Usage"
          renderValue={(item) => `${item.toFixed(1)}%`}
        />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>
</ContentLayout>
