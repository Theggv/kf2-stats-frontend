<script lang="ts">
  import Link from './Link.svelte';
  import Logo from './Logo.svelte';

  type Link = { href: string; title: string };

  const links: Link[] = [
    { title: 'Servers list', href: '/servers' },
    { title: 'Sessions', href: '/sessions' },
  ];
</script>

<ul class="flex px-4 py-2 gap-2">
  <Logo />
  {#each links as link (link.href)}
    <Link href={link.href} title={link.title} />
  {/each}
</ul>

<style>
  ul {
    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
  }
</style>
