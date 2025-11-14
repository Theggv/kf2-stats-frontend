<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { AiOutlineHistory } from 'svelte-icons-pack/ai';
  import { BsFilter } from 'svelte-icons-pack/bs';

  import SectionLayout from '../common/SectionLayout.svelte';
  import { getStore, UserProfileMapsName } from './Maps.store';
  import Filter from './Filter.svelte';
  import { iconSettings } from '$lib/ui/icons';
  import { getContext, setContext } from 'svelte';
  import Table from './components/Table.svelte';
  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import { AuthContextName, type AuthContextType } from '$lib/hooks';
  import UserActivity from './UserActivity.svelte';
  import YearSelector from './components/YearSelector.svelte';
  import { PerkSelector } from '$lib/components/perk-selector';

  export let userId: number;

  const auth = getContext<AuthContextType>(AuthContextName);
  const { user } = auth;

  const store = getStore(user);
  const { isOwner, filter, year, maps } = store;

  $: store.userIdStore.set(userId);

  setContext(UserProfileMapsName, store);

  let perk: number = 0;
  $: filter.update((prev) => ({ ...prev, perks: perk ? [perk] : undefined }));
</script>

<ContentLayout>
  <svelte:fragment slot="sidebar">
    <SectionLayout sticky>
      <svelte:fragment slot="title">Most Played Maps</svelte:fragment>
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
      <svelte:fragment slot="title">Match History</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineHistory} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <Table data={$maps} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>
</ContentLayout>
