<script lang="ts">
  import { PerkIcon } from '$lib/ui/icons';

  export let perk: number;

  function handleClick(prev: number, curr: number) {
    perk = prev === curr ? 0 : curr;
  }
</script>

<div class="perks">
  {#each Array(10).fill(0) as _, index}
    {@const perkIdx = index + 1}

    <div
      role="button"
      tabindex="0"
      on:click={() => handleClick(perk, perkIdx)}
      on:keypress={(e) => e.code === 'Enter' && handleClick(perk, perkIdx)}
    >
      <PerkIcon perk={perkIdx} prestige={0} disabled={perk !== perkIdx} />
    </div>
  {/each}
</div>

<style>
  .perks {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .perks {
      justify-content: center;
    }
  }
</style>
