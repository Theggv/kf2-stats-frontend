<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import Layout from '../common/Layout.svelte';
  import SectionLayout from '../common/SectionLayout.svelte';
  import { isPrecisionPerk } from '../common';
  import BsFilter from 'svelte-icons-pack/bs/BsFilter';
  import Filter from './Filter.svelte';
  import { getStore, perks } from './Perks.store';
  import { perkToString } from '$lib/util/enum-to-text';
  import IoStatsChartOutline from 'svelte-icons-pack/io/IoStatsChartOutline';
  import Accuracy from './Accuracy.svelte';
  import BiTrendingUp from 'svelte-icons-pack/bi/BiTrendingUp';
  import Stats from './Stats.svelte';
  import { iconSettings } from '$lib/ui/icons';

  export let userId: number;

  const { userIdStore, selectedPerk, analytics, averageZedtime, accuracy } =
    getStore();

  $: userIdStore.set(userId);

  $: selectedPerkStats = $analytics.find((x) => x.perk === $selectedPerk);
</script>

<Layout>
  <svelte:fragment slot="sidebar">
    <SectionLayout sticky>
      <svelte:fragment slot="title">Perks</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsFilter} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Filter
          data={perks.map((perk) => {
            const data = $analytics.find((x) => x.perk === perk);
            return { perk, games: 0, wins: 0, ...data };
          })}
          bind:selectedPerk={$selectedPerk}
        />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <SectionLayout>
      <svelte:fragment slot="title">
        <span>Stats</span>
        {#if $selectedPerk}
          <span class="secondary">—</span>
          <span>{perkToString($selectedPerk)}</span>
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="subtitle">All the time</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={IoStatsChartOutline} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        {#if selectedPerkStats}
          <Stats
            data={{
              averageZedtime: $averageZedtime,
              ...selectedPerkStats,
            }}
          />
        {:else}
          <div class="empty secondary">Select a perk</div>
        {/if}
      </svelte:fragment>
    </SectionLayout>

    {#if isPrecisionPerk($selectedPerk)}
      <SectionLayout>
        <svelte:fragment slot="title">Accuracy</svelte:fragment>
        <svelte:fragment slot="subtitle">Last 90 days</svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={BiTrendingUp} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <Accuracy data={$accuracy} />
        </svelte:fragment>
      </SectionLayout>
    {/if}
  </svelte:fragment>
</Layout>

<style>
  .secondary {
    color: var(--text-secondary);
    font-weight: bold;
  }

  .empty {
    padding-left: 1rem;
  }
</style>
