<script>
  import { Icon } from 'svelte-icons-pack';
  import { IoPodium } from 'svelte-icons-pack/io';

  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import { LoaderBoardCtxKey, getStore } from './Leaderboard.store';
  import PlayersList from './PlayersList.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import { setContext } from 'svelte';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { periods } from './periods';
  import { iconSettings } from '$lib/ui/icons';

  const { users, perk, period } = setContext(LoaderBoardCtxKey, getStore());
</script>

<AutoScroll>
  <SectionLayout>
    <svelte:fragment slot="title">Leaderboard</svelte:fragment>
    <svelte:fragment slot="subtitle">
      <div class="filters">
        <div class="periods">
          {#each periods as { label }, index}
            <div
              class:selected={$period === index}
              role="button"
              tabindex="0"
              on:click={() => period.set(index)}
              on:keypress={(e) => e.code === 'Enter' && period.set(index)}
            >
              {label}
            </div>
          {/each}
        </div>
        <div class="perks">
          {#each Array(9).fill(0) as _, index}
            {@const perkIdx = index + 1}
            <div
              role="button"
              tabindex="0"
              on:click={() =>
                perk.update((prev) => (prev === perkIdx ? 0 : perkIdx))}
              on:keypress={(e) =>
                e.code === 'Enter' &&
                perk.update((prev) => (prev === perkIdx ? 0 : perkIdx))}
            >
              <PerkIcon
                perk={perkIdx}
                prestige={0}
                disabled={$perk !== perkIdx}
              />
            </div>
          {/each}
        </div>
      </div>
    </svelte:fragment>
    <svelte:fragment slot="icon">
      <Icon src={IoPodium} {...iconSettings} />
    </svelte:fragment>
    <svelte:fragment slot="content">
      <PlayersList data={$users} />
    </svelte:fragment>
  </SectionLayout>
</AutoScroll>

<style>
  .filters {
    padding-top: 0.5rem;
    display: flex;
    flex-direction: row;
    gap: 2rem;
  }

  @media (max-width: 600px) {
    .perks,
    .periods {
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    .filters {
      flex-direction: column;
      gap: 0.5rem;
    }
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
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .selected {
    color: var(--text-primary);
  }
</style>
