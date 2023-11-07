<script lang="ts">
  import { onDestroy, createEventDispatcher } from 'svelte';

  export let threshold = 0;
  export let horizontal = false;
  export let hasMore = true;

  const dispatch = createEventDispatcher();
  let isLoadMore = false;
  let component: HTMLElement;

  $: {
    if (component) {
      const element = component.parentNode;

      element?.addEventListener('scroll', onScroll);
      element?.addEventListener('resize', onScroll);
    }
  }

  const onScroll = (e: Event) => {
    const element = e.target as Element;

    const offset = horizontal
      ? element.scrollWidth - element.clientWidth - element.scrollLeft
      : element.scrollHeight - element.clientHeight - element.scrollTop;

    if (offset <= threshold) {
      if (!isLoadMore && hasMore) {
        dispatch('loadMore');
      }
      isLoadMore = true;
    } else {
      isLoadMore = false;
    }
  };

  onDestroy(() => {
    if (component) {
      const element = component.parentNode;

      element?.removeEventListener('scroll', null);
      element?.removeEventListener('resize', null);
    }
  });
</script>

<div bind:this={component} style="width:0px" />
