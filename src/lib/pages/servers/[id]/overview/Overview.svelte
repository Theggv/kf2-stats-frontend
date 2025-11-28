<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineHistory } from 'svelte-icons-pack/ai';
  import { BsCalendar3 } from 'svelte-icons-pack/bs';
  import { RiBusinessBarChartHorizontalFill } from 'svelte-icons-pack/ri';

  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import PerkChart from '$lib/components/charts/PerkChart.svelte';
  import { groupBy } from '$lib/util';
  import type { ServerData } from '$lib/api/servers';

  import { getStore } from './Overview.store';
  import MatchesList from '../matches/MatchesList.svelte';
  import LiveMatch from './LiveMatch.svelte';

  import { getStore as perkPlaytimeStore } from './charts/PerkPlaytime';
  import { iconSettings } from '$lib/ui/icons';
  import type { Match } from '$lib/api/matches';
  import { GameStatus } from '$lib/api/sessions';
  import { MatchesListItem } from '$lib/components/matches-list';

  export let server: ServerData;

  const { serverIdStore, lastMatches } = getStore();
  $: serverIdStore.set(server.id);

  function inProgress(item: Match) {
    return (
      item.session.status === GameStatus.Lobby ||
      item.session.status === GameStatus.InProgress
    );
  }

  function notInProgress(item: Match) {
    return (
      item.session.status !== GameStatus.Lobby &&
      item.session.status !== GameStatus.InProgress
    );
  }

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
    {#if currentMatch}
      <SectionLayout>
        <svelte:fragment slot="title">Current Match</svelte:fragment>
        <svelte:fragment slot="icon">
          <div class="live-icon" />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <MatchesListItem item={currentMatch} withPreview />
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
