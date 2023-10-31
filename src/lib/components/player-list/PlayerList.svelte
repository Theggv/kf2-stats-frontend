<script lang="ts">
  // @ts-ignore
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { usersStore } from './store';
  import { writable } from 'svelte/store';
  import Player from './Player.svelte';
  import AutoScroll from '../auto-scroll/AutoScroll.svelte';

  const [users, loading, err, fetch] = usersStore();

  let page = writable(0);

  $: fetch($page, false);
</script>

<AutoScroll>
  <VirtualList items={$users} let:item>
    <Player {item} />
  </VirtualList>
</AutoScroll>
