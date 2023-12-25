<script>
  // @ts-ignore
  import Icon from 'svelte-icons-pack/Icon.svelte';

  import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';
  import BiFilter from 'svelte-icons-pack/bi/BiFilter';

  import ContentLayout from '$lib/layouts/ContentLayout.svelte';
  import SectionLayout from '$lib/layouts/SectionLayout.svelte';
  import { iconSettings } from '../common';
  import { LoaderBoardCtxKey, getStore } from './PlayersTop.store';
  import PlayersList from './PlayersList.svelte';
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import { setContext } from 'svelte';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { periods } from './periods';

  const { users, perk, period } = setContext(LoaderBoardCtxKey, getStore());
</script>

<AutoScroll>
  <SectionLayout>
    <svelte:fragment slot="title">Search results</svelte:fragment>
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
      <Icon src={AiOutlineSearch} {...iconSettings} />
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
  .perks {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
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
