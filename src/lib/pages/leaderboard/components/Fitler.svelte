<script lang="ts">
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { getContext } from 'svelte';
  import { LeaderboardCtxKey, type LeaderboardStore } from '../store';
  import { periods } from '../periods';

  const { periodIdx, period, perk } =
    getContext<LeaderboardStore>(LeaderboardCtxKey);

  $: selectedPeriod = periods[$periodIdx];

  function changePeriod(previous: boolean) {
    const newPeriod = selectedPeriod.transform!(
      $period.from,
      $period.to,
      previous
    );
    $period = newPeriod;
  }
</script>

<div class="filters">
  <div class="perks">
    {#each Array(10).fill(0) as _, index}
      {@const perkIdx = index + 1}
      <div
        role="button"
        tabindex="0"
        on:click={() => perk.update((prev) => (prev === perkIdx ? 0 : perkIdx))}
        on:keypress={(e) =>
          e.code === 'Enter' &&
          perk.update((prev) => (prev === perkIdx ? 0 : perkIdx))}
      >
        <PerkIcon perk={perkIdx} prestige={0} disabled={$perk !== perkIdx} />
      </div>
    {/each}
  </div>

  <div class="periods">
    <div class="list">
      {#each periods as { label }, index}
        <div
          class:selected={$periodIdx === index}
          role="button"
          tabindex="0"
          on:click={() => periodIdx.set(index)}
          on:keypress={(e) => e.code === 'Enter' && periodIdx.set(index)}
        >
          {label}
        </div>
      {/each}
    </div>

    <div class="controls">
      {#if !selectedPeriod.allTime}
        <div class="label">
          {selectedPeriod.format($period.from, $period.to)}
        </div>
        <div>
          <button on:click={() => changePeriod(true)}>&lt;</button>
          <button on:click={() => changePeriod(false)}>&gt;</button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .filters {
    padding-top: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .perks {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .periods {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .periods > .list {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .periods > .controls,
  .periods > .controls > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .periods > .controls > .label {
    text-wrap: nowrap;
  }

  .selected {
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .perks {
      justify-content: center;
    }

    .filters,
    .periods,
    .periods > .list {
      align-items: center;
    }

    .filters {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
</style>
