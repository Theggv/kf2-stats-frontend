<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineLineChart } from 'svelte-icons-pack/ai';
  import { BiServer } from 'svelte-icons-pack/bi';
  import {
    RiSystemRadioButtonLine,
    RiBusinessBarChartHorizontalFill,
  } from 'svelte-icons-pack/ri';

  import { getStore } from './MainPage.store';
  import { getStore as getPlayersOnlineStore } from './charts/PlayersOnline.store';
  import { getStore as getSessionsPlayedStore } from './charts/SessionsPlayed.store';
  import { getStore as perkPlaytimeStore } from './charts/PerkPlaytime';
  import LineTimeChart from '$lib/components/charts/LineTimeChart.svelte';
  import { periods } from '$lib/components/charts';
  import PopularServers from './PopularServers.svelte';
  import PerkChart from '$lib/components/charts/PerkChart.svelte';
  import { iconSettings } from '$lib/ui/icons';
  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';

  const { currentOnline, popularServers } = getStore();

  const { selectedPeriod: onlinePeriod, data: onlineData } =
    getPlayersOnlineStore();

  const { selectedPeriod: sessionPeriod, data: sessionData } =
    getSessionsPlayedStore();

  const { data: perkPlaytimeData } = perkPlaytimeStore();
</script>

<div class="root">
  <ContentLayout>
    <svelte:fragment slot="sidebar">
      <div class="header">Better Stats</div>

      <SectionLayout>
        <svelte:fragment slot="title">Current Online</svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={RiSystemRadioButtonLine} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <div class="content">
            <div class="secondary">{$currentOnline} Players</div>
          </div>
        </svelte:fragment>
      </SectionLayout>

      <SectionLayout>
        <svelte:fragment slot="title">Popular Servers</svelte:fragment>
        <svelte:fragment slot="subtitle">By Last 30 Days Online</svelte:fragment
        >
        <svelte:fragment slot="icon">
          <Icon src={BiServer} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <PopularServers data={$popularServers} />
        </svelte:fragment>
      </SectionLayout>

      <SectionLayout>
        <svelte:fragment slot="title">Popular Perks</svelte:fragment>
        <svelte:fragment slot="subtitle">Last 90 Days</svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={RiBusinessBarChartHorizontalFill} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <PerkChart
            tooltop={(x) => (x === 1 ? '1 hour' : `${x} hours`)}
            data={$perkPlaytimeData}
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
            {periods}
            label="Players"
          />
        </svelte:fragment>
      </SectionLayout>

      <SectionLayout>
        <svelte:fragment slot="title">Sessions Chart</svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={AiOutlineLineChart} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <LineTimeChart
            bind:selectedPeriod={$sessionPeriod}
            data={$sessionData}
            {periods}
            label="Sessions"
          />
        </svelte:fragment>
      </SectionLayout>
    </svelte:fragment>
  </ContentLayout>
</div>

<style>
  .root {
    padding: 0.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .header {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
  }

  .content {
    padding: 0 1rem;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }
</style>
