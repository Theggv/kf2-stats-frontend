<script lang="ts">
  import { page } from '$app/stores';

  $: selected = href.includes($page.url.pathname);

  export let href: string;
  export let title: string;
</script>

<li class="flex text-center font-bold">
  <a
    class="flex-1 rounded-lg bg-opacity-70
  {!selected && 'hover:bg-red-700 hover:bg-opacity-70'}"
    class:bg-orange-600={selected}
    {href}>{title}</a
  >
</li>

<style>
  li {
    min-width: 150px;
    text-transform: uppercase;
    transition: all 100ms;
  }

  a {
    padding: 0.5rem 1rem;
  }
</style>
