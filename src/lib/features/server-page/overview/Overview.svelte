<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import AiOutlineHistory from 'svelte-icons-pack/ai/AiOutlineHistory';
  import BsCalendar3 from 'svelte-icons-pack/bs/BsCalendar3';
  import RiBusinessBarChartHorizontalFill from 'svelte-icons-pack/ri/RiBusinessBarChartHorizontalFill';

  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import PerkChart from '$lib/components/charts/PerkChart.svelte';
  import { groupBy } from '$lib/util';
  import type { ServerData } from '$lib/api/servers';

  import { getStore } from './Overview.store';
  import { iconSettings, inProgress, notInProgress } from '../common';
  import MatchesList from '../matches/MatchesList.svelte';
  import MatchesListItem from '../matches/MatchesListItem.svelte';
  import LiveMatch from './LiveMatch.svelte';

  import { getStore as perkPlaytimeStore } from './charts/PerkPlaytime';

  export let server: ServerData;

  const { serverIdStore, lastMatches } = getStore();
  $: serverIdStore.set(server.id);

  $: currentMatch = $lastMatches.find(inProgress);
  $: groupedLastMatches = groupBy($lastMatches.filter(notInProgress), (item) =>
    new Date(item.session.updated_at).toDateString()
  );

  const { data: perkPlaytimeData } = perkPlaytimeStore(server.id);
</script>

<ContentLayout>
  <svelte:fragment slot="sidebar">
    <SectionLayout>
      <svelte:fragment slot="title">Players</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsCalendar3} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <LiveMatch serverId={server.id} />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Popular Perks</svelte:fragment>
      <svelte:fragment slot="subtitle">Last 30 Days</svelte:fragment>
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
    {#if currentMatch}
      <SectionLayout>
        <svelte:fragment slot="title">Current Match</svelte:fragment>
        <svelte:fragment slot="icon">
          <div class="live-icon" />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <MatchesListItem data={currentMatch} />
        </svelte:fragment>
      </SectionLayout>
    {/if}

    <SectionLayout>
      <svelte:fragment slot="title">Recent Matches</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineHistory} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <MatchesList data={groupedLastMatches} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>
</ContentLayout>

<style>
</style>
