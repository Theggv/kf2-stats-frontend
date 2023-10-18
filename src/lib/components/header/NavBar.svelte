<script lang="ts">
  import Link from './Link.svelte';

  type Link = { href: string; title: string };

  const links: Link[] = [
    { title: 'Servers list', href: '/servers' },
    { title: 'Sessions', href: '/sessions' },
  ];
</script>

<ul class="flex px-4 py-2 gap-2 bg-neutral-900 bg-opacity-80 text-neutral-300">
  {#each links as link (link.href)}
    <Link href={link.href} title={link.title} />
  {/each}
</ul>

<style>
</style>
