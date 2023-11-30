<script lang="ts">
  import { isTabSelected, type TabData } from '.';

  export let tabs: TabData[];
  export let selectedTab: string;
</script>

<ul class="tabs">
  {#each tabs as tab (tab.href)}
    <li class:selected={isTabSelected(selectedTab, tab)}>
      <a href={tab.href}>
        {tab.content}
      </a>
    </li>
  {/each}
</ul>

<style>
  .tabs {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .tabs > li {
    font-weight: bold;
    border-bottom: 2px solid transparent;
  }

  .tabs > .selected {
    border-bottom: 2px solid var(--text-primary);
  }
</style>
