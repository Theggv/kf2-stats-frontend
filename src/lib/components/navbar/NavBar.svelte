<script lang="ts">
  import Link from './Link.svelte';
  import Logo from './Logo.svelte';
  import { links } from './data';
</script>

<ul class="root">
  <Logo />
  {#each links as link (link.href)}
    <Link href={link.href} title={link.title} />
  {/each}
</ul>

<style>
  .root {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem 1rem;
  }

  ul {
    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
  }
</style>
