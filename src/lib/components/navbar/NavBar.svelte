<script lang="ts">
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import MediaQuery from 'svelte-media-queries';

  import Link from './Link.svelte';
  import Logo from './Logo.svelte';
  import { links } from './data';
  import { iconSettings } from '$lib/ui/icons';
</script>

<ul class="root">
  <MediaQuery query="(min-width: 480px)" let:matches>
    {#if matches}
      <Logo />
    {/if}
  </MediaQuery>
  {#each links as link (link.href)}
    <MediaQuery query="(max-width: 1024px)" let:matches>
      {#if matches}
        <Link href={link.href}>
          <Icon src={link.icon} {...iconSettings} />
        </Link>
      {:else}
        <Link href={link.href} title={link.title} />
      {/if}
    </MediaQuery>
  {/each}
</ul>

<style>
  .root {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem 1rem;
    width: 100%;
  }

  ul {
    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
  }
</style>
