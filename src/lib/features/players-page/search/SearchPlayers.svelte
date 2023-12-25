<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import BiFilter from 'svelte-icons-pack/bi/BiFilter';
  import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';

  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import { groupBy } from '$lib/util';
  import { getStore } from './SearchPlayers.store';
  import { iconSettings } from '../common';
  import PlayersList from './PlayersList.svelte';
  import InfiniteScroll from '$lib/components/infinite-scroll/InfiniteScroll.svelte';

  const { filter, hasMore, page, total, users } = getStore();

  $: groupedUsers = groupBy($users, (item) =>
    new Date(item.updated_at).toDateString()
  );
</script>

<ContentLayout>
  <svelte:fragment slot="sidebar">
    <SectionLayout sticky>
      <svelte:fragment slot="title">Filter</svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={BiFilter} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div class="content">
          <input
            bind:value={$filter.search_text}
            placeholder="Search by name"
            class="input"
          />
        </div>
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <SectionLayout>
      <svelte:fragment slot="title">Search results</svelte:fragment>
      <svelte:fragment slot="subtitle">
        {#if $total}
          {$total} players found
        {/if}
      </svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={AiOutlineSearch} {...iconSettings} />
      </svelte:fragment>
      <svelte:fragment slot="content">
        <PlayersList data={groupedUsers} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <InfiniteScroll
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
    threshold={500}
  />
</ContentLayout>

<style>
  .content {
    padding: 0 1rem;
    min-height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .input {
    background: transparent;
    border-radius: 0.25rem;
    border: 1px solid var(--text-primary);
    height: 32px;
    padding: 0.5rem;
    padding-left: 1rem;
    font-weight: bold;
    color: var(--text-secondary);
    font-size: 12px;
  }

  .input::placeholder {
    color: var(--text-secondary);
    font-size: 14px;
  }
</style>
