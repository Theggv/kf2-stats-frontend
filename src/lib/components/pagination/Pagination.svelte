<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Icon } from 'svelte-icons-pack';

  import { BiSkipPrevious } from 'svelte-icons-pack/bi';
  import { IoCaretBack } from 'svelte-icons-pack/io';
  import { IoCaretForward } from 'svelte-icons-pack/io';
  import { BiSkipNext } from 'svelte-icons-pack/bi';
  import Button from './Button.svelte';

  const dispatch = createEventDispatcher<{
    changePage: { page: number; loadMore: boolean };
  }>();

  function onClick(page: number) {
    dispatch('changePage', { page, loadMore: false });
  }

  // Pagination starts from 0
  export let page: number;
  export let total: number;
  export let limit: number;

  let pages: number[] = [];

  $: totalPages = Math.ceil(total / limit);
  $: page = Math.max(Math.min(page, totalPages - 1), 0);

  $: if (totalPages <= 7) {
    pages = new Array(totalPages).fill(0).map((_, i) => i + 1);
  } else {
    pages = [
      1,
      page < 4 ? 2 : 0,
      page < 4 ? 3 : totalPages - page - 1 < 4 ? totalPages - 4 : page,
      page < 4 ? 4 : totalPages - page - 1 < 4 ? totalPages - 3 : page + 1,
      page < 4 ? 5 : totalPages - page - 1 < 4 ? totalPages - 2 : page + 2,
      totalPages - page - 1 < 4 ? totalPages - 1 : 0,
      totalPages,
    ];
  }
</script>

{#if totalPages > 0}
  <div class="pagination">
    <Button disabled={page === 0} on:click={() => onClick(0)}>&lt;&lt;</Button>

    <Button disabled={page === 0} on:click={() => onClick(page - 1)}>
      &lt;
    </Button>

    {#each pages as number}
      <Button
        disabled={number === 0}
        selected={page === number - 1}
        on:click={() => onClick(number - 1)}
      >
        {number === 0 ? '...' : number}
      </Button>
    {/each}

    <Button
      disabled={page === totalPages - 1}
      on:click={() => onClick(page + 1)}
    >
      &gt;
    </Button>

    <Button
      disabled={page === totalPages - 1}
      on:click={() => onClick(totalPages - 1)}
    >
      &gt;&gt;
    </Button>
  </div>
{/if}

<style>
  .pagination {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
  }
</style>
