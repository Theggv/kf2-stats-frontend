<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import InfiniteScroll from '$lib/components/infinite-scroll/InfiniteScroll.svelte';
  import { groupBy } from '$lib/util';
  import { iconSettings } from '../common';
  import { getStore } from './Matches.store';
  import AiOutlineHistory from 'svelte-icons-pack/ai/AiOutlineHistory';
  import BsFilter from 'svelte-icons-pack/bs/BsFilter';
  import Layout from '../common/Layout.svelte';
  import type { ServerData } from '$lib/api/servers';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import PlayersList from './PlayersList.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';

  export let server: ServerData;

  const { serverIdStore, page, players, total, hasMore } = getStore();
  $: serverIdStore.set(server.id);

  $: groupedPlayers = groupBy($players, (item) =>
    new Date(item.updated_at).toDateString()
  );
</script>

<AutoScroll>
  <SectionLayout>
    <svelte:fragment slot="title">Recent Players</svelte:fragment>
    <svelte:fragment slot="subtitle">
      {#if $total}
        {$total} players
      {/if}
    </svelte:fragment>
    <svelte:fragment slot="icon">
      <Icon src={AiOutlineHistory} {...iconSettings} />
    </svelte:fragment>
    <svelte:fragment slot="content">
      <PlayersList data={groupedPlayers} />
    </svelte:fragment>
  </SectionLayout>

  <InfiniteScroll
    hasMore={$hasMore}
    on:loadMore={() => page.update((p) => p + 1)}
    threshold={300}
  />
</AutoScroll>
