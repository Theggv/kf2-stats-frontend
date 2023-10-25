<script lang="ts">
  import { page } from '$app/stores';
  import { isTabSelected, tabs } from './store';

  $: selected = $page.url.hash;
</script>

<ul>
  {#each tabs as tab (tab.href)}
    <li class:selected={isTabSelected(selected, tab)}>
      <a href={tab.href}>{tab.content}</a>
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
    font-weight: bold;
  }

  .selected {
    border-bottom: 2px solid var(--text-primary);
  }
</style>
