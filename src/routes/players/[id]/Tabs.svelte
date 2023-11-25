<script lang="ts">
  import { tabs } from './Tabs.store';
  import { page } from '$app/stores';

  export let userId: number;
</script>

<ul>
  {#each tabs as tab (tab.href)}
    {@const href = `/players/${userId}${tab.href}`}

    <li class:selected={href === $page.url.pathname}>
      <a {href}>{tab.content}</a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  li {
    padding: 0.5rem;
    font-weight: bold;
  }

  .selected {
    border-bottom: 2px solid var(--text-primary);
  }
</style>
