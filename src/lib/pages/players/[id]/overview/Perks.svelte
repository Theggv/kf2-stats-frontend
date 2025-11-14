<script lang="ts">
  import type { UserPerksAnalyticsResponseItem } from '$lib/api/analytics';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';

  export let data: UserPerksAnalyticsResponseItem[] = [];

  function sortByMatches(
    a: UserPerksAnalyticsResponseItem,
    b: UserPerksAnalyticsResponseItem
  ) {
    return b.games - a.games;
  }
</script>

<div class="root">
  {#each data.sort(sortByMatches) as perk (perk.perk)}
    <div class="perk">
      <div class="icon">
        <PerkIcon perk={perk.perk} prestige={0} />
      </div>
      <div class="matches">
        <div class="secondary">Matches</div>
        <div>{perk.games}</div>
      </div>
      <div class="matches">
        <div class="secondary">Winrate</div>
        <div>{((100 * perk.wins) / perk.games).toFixed(1)}%</div>
      </div>
    </div>
  {/each}
</div>

<style>
  .root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .perk {
    font-weight: bold;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
  }

  .matches {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }

  .secondary {
    color: var(--text-secondary);
  }
</style>
