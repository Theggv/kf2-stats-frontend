<script lang="ts">
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { perkToString } from '$lib/util/enum-to-text';
  import type { PerkOverview } from './Perks.store';

  export let data: PerkOverview[] = [];

  export let selectedPerk: number;

  function sortByMatches(a: PerkOverview, b: PerkOverview) {
    return b.games - a.games;
  }

  function onClick(perk: PerkOverview) {
    if (perk.games <= 0) return;
    if (perk.perk === selectedPerk) return;
    selectedPerk = perk.perk;
  }
</script>

<div class="root">
  {#each data.sort(sortByMatches) as perk (perk.perk)}
    <div
      class="perk"
      class:cant-select={perk.games <= 0}
      class:selected={perk.perk === selectedPerk}
      on:click={() => onClick(perk)}
      on:keypress={(e) => e.code === 'Enter' && onClick(perk)}
      role="button"
      tabindex="0"
    >
      <div class="icon">
        <PerkIcon perk={perk.perk} prestige={0} />
      </div>
      <div class="name">
        {perkToString(perk.perk)}
      </div>
      <div class="matches-wrapper">
        <div class="matches">
          <div class="secondary">Matches</div>
          <div>{perk.games}</div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .root {
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .perk {
    padding: 0 0.25rem;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    border-radius: 0.25rem;
    user-select: none;
  }

  .name {
    text-align: left;
  }

  .matches-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .matches {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }

  .secondary {
    color: var(--text-secondary);
  }

  .cant-select {
    cursor: not-allowed;
  }

  .selected {
    background: rgba(255, 255, 255, 0.1);
  }
</style>
