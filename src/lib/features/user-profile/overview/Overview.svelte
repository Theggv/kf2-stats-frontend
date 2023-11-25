<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import { getStore } from './Overview.store';
  import { groupBy } from '$lib/util';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import RecentSessionsList from '../matches/RecentSessionsList.svelte';
  import RecentSessionsListItem from '../matches/RecentSessionsListItem.svelte';
  import AiOutlineHistory from 'svelte-icons-pack/ai/AiOutlineHistory';
  import BiTrendingUp from 'svelte-icons-pack/bi/BiTrendingUp';
  import BsCalendar3 from 'svelte-icons-pack/bs/BsCalendar3';
  import RiOthersSwordFill from 'svelte-icons-pack/ri/RiOthersSwordFill';
  import RiUserTeamLine from 'svelte-icons-pack/ri/RiUserTeamLine';
  import Playtime from './Playtime.svelte';
  import Perks from './Perks.svelte';
  import Accuracy from './Accuracy.svelte';
  import Teammates from './Teammates.svelte';
  import SectionLayout from '../common/SectionLayout.svelte';
  import { iconSettings, inProgress, notInProgress } from '../common';
  import Layout from '../common/Layout.svelte';

  export let userId: number;

  const { userIdStore, recentMatches, playtime, accuracy, teammates, perks } =
    getStore();
  $: userIdStore.set(userId);

  $: currentMatch = $recentMatches.find(inProgress);

  $: groupedRecentMatches = groupBy(
    $recentMatches.filter(notInProgress),
    (item) => new Date(item.updated_at).toDateString()
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
      <svelte:fragment slot="title">Teammates</svelte:fragment>
      <svelte:fragment slot="subtitle">Most games played</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={RiUserTeamLine} {...iconSettings} />
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
          <RecentSessionsListItem data={currentMatch} />
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
