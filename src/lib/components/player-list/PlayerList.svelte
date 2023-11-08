<script lang="ts">
  import Player from './Player.svelte';
  import AutoScroll from '../auto-scroll/AutoScroll.svelte';
  import InfiniteScroll from '../infinite-scroll/InfiniteScroll.svelte';
  import type { FilterUsersResponseUser } from '$lib/api/users';

  export let data: FilterUsersResponseUser[];
  export let hasMore: boolean;
</script>

<AutoScroll>
  {#each data as item (item.id)}
   <Player {item} />
  {/each}
  <InfiniteScroll {hasMore} on:loadMore threshold={100} />
</AutoScroll>

