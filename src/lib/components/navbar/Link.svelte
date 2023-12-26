<script lang="ts">
  import { page } from '$app/stores';
  import StyledLink from '$lib/ui/a/StyledLink.svelte';

  $: selected = $page.url.pathname != '/' && href.includes($page.url.pathname);

  export let href: string;
  export let title: string = '';
</script>

<li class:has-text={!!title}>
  <StyledLink class="navbar-link" {href} {selected}>
    {title}
    <slot />
  </StyledLink>
</li>

<style>
  li {
    display: flex;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
  }

  .has-text {
    min-width: 150px;
  }

  :global(.navbar-link) {
    flex: 1;
    padding: 0.5rem 1rem;
  }
</style>
