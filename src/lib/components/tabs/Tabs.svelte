<script lang="ts">
  export let tabs: string[];
  export let selectedTab: number;
</script>

<ul class="tabs">
  {#each tabs as tab, index (tab)}
    <li class:selected={selectedTab === index}>
      <div
        on:click={() => (selectedTab = index)}
        on:keypress={(e) => e.code === 'Enter' && (selectedTab = index)}
        role="button"
        tabindex="0"
      >
        {tab}
      </div>
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
