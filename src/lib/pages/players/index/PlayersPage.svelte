<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { FaSolidUsers } from 'svelte-icons-pack/fa';

  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import { groupBy } from '$lib/util';
  import { getStore } from './PlayersPage.store';
  import PlayersList from './components/PlayersList.svelte';
  import InfiniteScroll from '$lib/components/infinite-scroll/InfiniteScroll.svelte';
  import { iconSettings } from '$lib/ui/icons';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';

  const { filter, hasMore, page, total, users } = getStore();

  $: groupedUsers = groupBy($users, (item) =>
    new Date(item.updated_at).toDateString()
  );
</script>

<AutoScroll>
  <SectionLayout>
    <svelte:fragment slot="title">
      <div class="title">
        <div>Players</div>
        <input
          bind:value={$filter.search_text}
          placeholder="Search by name"
          class="input"
        />
      </div>
    </svelte:fragment>
    <svelte:fragment slot="subtitle">
      {#if $total}
        <div>{$total} players found</div>
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="icon">
      <Icon src={FaSolidUsers} {...iconSettings} />
    </svelte:fragment>
    <svelte:fragment slot="content">
      <PlayersList data={groupedUsers} />
    </svelte:fragment>
  </SectionLayout>
  <InfiniteScroll
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
    threshold={500}
  />
</AutoScroll>

<style>
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  @media (max-width: 600px) {
    .title {
      flex: 1;
      flex-direction: column;
    }

    .input {
      max-width: 100%;
      width: 100%;
    }
  }

  .input {
    background: transparent;
    border-radius: 0.25rem;
    border: 1px solid var(--text-primary);
    padding: 0.5rem 1rem;
    font-weight: bold;
    font-size: 14px;
  }

  .input::placeholder {
    color: var(--text-secondary);
    font-size: 14px;
  }
</style>
