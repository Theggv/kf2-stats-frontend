<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { BsFilter } from 'svelte-icons-pack/bs';

  import { InfiniteScroll } from '$lib/components/infinite-scroll';
  import { PerkSelector } from '$lib/components/perk-selector';
  import { SectionLayout, ContentLayout } from '$lib/layouts';
  import { iconSettings } from '$lib/ui/icons';
  import { getContext, setContext } from 'svelte';
  import Table from './components/Table.svelte';
  import { getStore, UserProfileMatchesName } from './Matches.store';
  import Filter from './Filter.svelte';
  import UserActivity from './UserActivity.svelte';
  import { AuthContextName, type AuthContextType } from '$lib/hooks';
  import YearSelector from './components/YearSelector.svelte';
  import { page as pageStore } from '$app/stores';

  export let userId: number;

  const auth = getContext<AuthContextType>(AuthContextName);
  const { user } = auth;

  const store = getStore(user);
  const { isOwner, filter, total, year } = store;
  const { page, hasMore } = store;

  $: store.userIdStore.set(userId);

  setContext(UserProfileMatchesName, store);

  let perk: number = 0;
  $: filter.update((prev) => ({ ...prev, perks: perk ? [perk] : undefined }));

  pageStore.subscribe((x) => {
    let date_from: Date;
    let date_to: Date;

    const selectedDate = x.url.searchParams.get('date');
    if (!selectedDate) {
      filter.update((prev) => ({ ...prev, date_from, date_to }));
      return;
    }

    date_from = new Date(selectedDate);
    date_to = new Date(date_from.getTime() + 1000 * 60 * 60 * 24 - 1);
    filter.update((prev) => ({ ...prev, date_from, date_to }));
  });
</script>

<ContentLayout>
  <svelte:fragment slot="sidebar">
    <SectionLayout>
      <svelte:fragment slot="title">Match History</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsFilter} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Filter />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <SectionLayout>
      <svelte:fragment slot="subtitle">
        <div class="activity-filter">
          <PerkSelector bind:perk />

          {#if $isOwner}
            <YearSelector bind:year={$year} />
          {/if}
        </div>
      </svelte:fragment>
      <svelte:fragment slot="content">
        {#if $isOwner}
          <UserActivity />
        {/if}
      </svelte:fragment>
    </SectionLayout>

    <SectionLayout>
      <svelte:fragment slot="title">Matches</svelte:fragment>
      <svelte:fragment slot="subtitle">
        {$total} matches found
      </svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BsFilter} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Table />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <InfiniteScroll
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
    threshold={300}
  />
</ContentLayout>

<style>
  .activity-filter {
    padding-top: 0.25rem;
    display: grid;
    grid-template-columns: 1fr auto;
  }
</style>
