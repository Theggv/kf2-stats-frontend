<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { IoPodium } from 'svelte-icons-pack/io';

  import { ListLayout, SectionLayout } from '$lib/layouts';
  import { iconSettings } from '$lib/ui/icons';
  import { setContext } from 'svelte';
  import { LeaderboardCtxKey, getStore } from './store';
  import { LeaderboardFilter, LeaderboardTable } from './components';
  import { Pagination } from '$lib/components/pagination';
  import type { PaginationResponse } from '$lib/api/common';

  const { users, metadata, page } = setContext(LeaderboardCtxKey, getStore());

  function getLeaderboardOffset(metadata?: PaginationResponse): number {
    if (!metadata) return 0;

    return metadata.page * metadata.results_per_page;
  }
</script>

<ListLayout>
  <svelte:fragment slot="header">
    <SectionLayout unroundBottom>
      <svelte:fragment slot="title">Leaderboard</svelte:fragment>
      <svelte:fragment slot="subtitle">
        <LeaderboardFilter />
      </svelte:fragment>
      <svelte:fragment slot="icon">
        <Icon src={IoPodium} {...iconSettings} />
      </svelte:fragment>
    </SectionLayout>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <LeaderboardTable data={$users} offset={getLeaderboardOffset($metadata)} />

    {#if $metadata}
      <div class="pagination-wrapper">
        <Pagination
          page={$metadata.page}
          limit={$metadata.results_per_page}
          total={$metadata.total_results}
          on:changePage={(e) => page.set(e.detail.page)}
        />
      </div>
    {/if}
  </svelte:fragment>
</ListLayout>

<style>
  .pagination-wrapper {
    margin: 0 auto;
    padding: 0.25rem;
  }
</style>
