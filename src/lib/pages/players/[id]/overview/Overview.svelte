<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineHistory } from 'svelte-icons-pack/ai';
  import { BiTrendingUp } from 'svelte-icons-pack/bi';
  import { BsCalendar3 } from 'svelte-icons-pack/bs';
  import { RiOthersSwordFill, RiUserFacesTeamLine } from 'svelte-icons-pack/ri';

  import { getStore } from './Overview.store';
  import { groupBy } from '$lib/util';
  import RecentSessionsList from './RecentSessionsList.svelte';

  import Playtime from './Playtime.svelte';
  import Perks from './Perks.svelte';
  import Accuracy from './Accuracy.svelte';
  import Teammates from './Teammates.svelte';
  import SectionLayout from '../common/SectionLayout.svelte';
  import Layout from '../common/Layout.svelte';
  import { iconSettings } from '$lib/ui/icons';
  import { LineTimeChart, periods } from '$lib/components/charts';
  import type { Match } from '$lib/api/matches';
  import { GameStatus } from '$lib/api/sessions';
  import { MatchesListItem } from '$lib/components/matches-list';

  export let userId: number;

  const { userIdStore, recentMatches, hist, teammates, perks } = getStore();
  const { playtime, accuracy, difficulty } = hist;

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

  $: userIdStore.set(userId);

  $: currentMatch = $recentMatches.find(inProgress);

  $: groupedRecentMatches = groupBy(
    $recentMatches.filter(notInProgress),
    (item) => new Date(item.session.updated_at).toDateString()
  );
</script>

<Layout>
  <svelte:fragment slot="sidebar">
    <SectionLayout>
      <svelte:fragment slot="title">Activity</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsCalendar3} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Playtime data={$playtime} on:onClickDate />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Perks</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={RiOthersSwordFill} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Perks data={$perks} />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Accuracy</svelte:fragment>
      <svelte:fragment slot="subtitle">Last 45 days</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BiTrendingUp} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Accuracy data={$accuracy} />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Session Difficulty</svelte:fragment>
      <svelte:fragment slot="subtitle">Last 45 days</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BiTrendingUp} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <LineTimeChart
          data={$difficulty}
          periods={periods.filter((_, i) => i === 2)}
          label="Avg. Difficulty"
          fractionDigits={1}
        />
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Teammates</svelte:fragment>
      <svelte:fragment slot="subtitle">Most games played</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={RiUserFacesTeamLine} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Teammates data={$teammates} />
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
          <MatchesListItem
            item={currentMatch}
            withServer
            withPreview
            withPerks
            datetimeFormat="compact"
          />
        </svelte:fragment>
      </SectionLayout>
    {/if}

    <SectionLayout>
      <svelte:fragment slot="title">Recent Matches</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineHistory} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <RecentSessionsList data={groupedRecentMatches} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>
</Layout>

<style>
  .live-icon {
    margin-left: 0.25rem;
    width: 1rem;
    height: 1rem;
    border-radius: 100px;
    background-color: var(--hover-primary);
  }
</style>
