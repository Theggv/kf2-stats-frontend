<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import AiOutlineLineChart from 'svelte-icons-pack/ai/AiOutlineLineChart';
  import RiSystemRadioButtonLine from 'svelte-icons-pack/ri/RiSystemRadioButtonLine';
  import BiServer from 'svelte-icons-pack/bi/BiServer';

  import { getStore } from './MainPage.store';
  import { iconSettings } from './common';
  import Layout from './common/Layout.svelte';
  import SectionLayout from './common/SectionLayout.svelte';
  import { getStore as getPlayersOnlineStore } from './charts/PlayersOnline.store';
  import { getStore as getSessionsPlayedStore } from './charts/SessionsPlayed.store';
  import LineTimeChart from '$lib/components/charts/LineTimeChart.svelte';
  import { periods } from '$lib/components/charts';
  import PopularServers from './PopularServers.svelte';

  const { currentOnline, popularServers } = getStore();

  const { selectedPeriod: onlinePeriod, data: onlineData } =
    getPlayersOnlineStore();
  const { selectedPeriod: sessionPeriod, data: sessionData } =
    getSessionsPlayedStore();
</script>

<div class="root">
  <Layout>
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
    </svelte:fragment>

    <svelte:fragment slot="content">
      <SectionLayout>
        <svelte:fragment slot="title">Unique Players Chart</svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={AiOutlineLineChart} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <LineTimeChart
            data={$onlineData}
            {periods}
            bind:selectedPeriod={$onlinePeriod}
            tooltop={(value) => (value === 1 ? '1 player' : `${value} players`)}
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
            data={$sessionData}
            {periods}
            bind:selectedPeriod={$sessionPeriod}
            tooltop={(value) => `${value} sessions`}
          />
        </svelte:fragment>
      </SectionLayout>
    </svelte:fragment>
  </Layout>
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
