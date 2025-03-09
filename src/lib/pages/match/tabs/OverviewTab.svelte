<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextName, type ContextType } from '../store';
  import {
    getCardContent,
    matchAnalysisStore,
    overviewCards,
  } from './OverviewTab.store';
  import { DifficultyChart } from '../components/graphs';
  import { MatchDifficulty } from '../components/difficulty';
  import { prepareLabels } from './GraphsTab.util';
  import { AutoScroll } from '$lib/components/auto-scroll';
  import { SectionLayout } from '$lib/layouts';
  import { iconSettings } from '$lib/ui/icons';
  import { Icon } from 'svelte-icons-pack';
  import { RiMediaSpeedUpFill } from 'svelte-icons-pack/ri';
  import { OverviewCard } from '../components/overview-card';
  import { IoPodium } from 'svelte-icons-pack/io';

  const store = getContext<ContextType>(ContextName);
  const { waves, users, overview } = store.match;

  const analysis = matchAnalysisStore(overview, waves);
  const { wavesZedGroups, difficulty, aggregatedUserStats } = analysis;
</script>

<AutoScroll>
  <div class="root">
    <div class="sidebar">
      <SectionLayout sticky>
        <svelte:fragment slot="title">
          <MatchDifficulty difficulty={$difficulty} />
        </svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={RiMediaSpeedUpFill} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <div class="difficulty-chart">
            <DifficultyChart
              labels={prepareLabels($waves)}
              datasets={$wavesZedGroups}
            />
          </div>
        </svelte:fragment>
      </SectionLayout>
    </div>

    <div>
      <SectionLayout>
        <svelte:fragment slot="title">Leaderboard</svelte:fragment>
        <svelte:fragment slot="icon">
          <Icon src={IoPodium} {...iconSettings} />
        </svelte:fragment>
        <svelte:fragment slot="content">
          <div class="content">
            {#each overviewCards as card, index (index)}
              {@const content = getCardContent(
                $aggregatedUserStats,
                $users,
                card
              )}

              {#if content}
                <OverviewCard {...content} />
              {/if}
            {/each}
          </div>
        </svelte:fragment>
      </SectionLayout>
    </div>
  </div>
  <slot />
</AutoScroll>

<style>
  .root {
    flex: 1;
    position: relative;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    .root {
      max-width: calc(100vw - 1.75rem);
      display: flex;
      flex-direction: column;
    }
  }
  @media (min-width: 640px) {
    .root {
      max-width: 572px;
    }
  }
  @media (min-width: 768px) {
    .root {
      max-width: 700px;
    }
  }
  @media (min-width: 1024px) {
    .root {
      max-width: 956px;
    }
  }
  @media (min-width: 1280px) {
    .root {
      max-width: 896px;
    }
  }
  @media (min-width: 1536px) {
    .root {
      max-width: 1150px;
    }
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sidebar .difficulty-chart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 1280px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
</style>
