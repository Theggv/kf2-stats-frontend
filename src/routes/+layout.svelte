<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    TimeScale,
    ArcElement,
    BarElement,
    Filler,
    TimeSeriesScale,
  } from 'chart.js';
  import 'chartjs-adapter-date-fns';
  import { SvelteUIProvider } from '@svelteuidev/core';
  import chartTrendline from 'chartjs-plugin-trendline';
  import { AppNavBar } from '$lib/components/navbar';
  import { LiveMatches } from '$lib/features/live-matches';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    Filler,
    LineElement,
    LinearScale,
    TimeScale,
    PointElement,
    CategoryScale,
    ArcElement,
    BarElement,
    TimeSeriesScale,
    chartTrendline
  );

  let active = false;

  onMount(() => (active = true));
</script>

<SvelteUIProvider themeObserver={'dark'}>
  <div class="root" class:active>
    <header>
      <AppNavBar />
    </header>
    <div class="main-container container mx-auto">
      <main>
        <slot />
      </main>
      <LiveMatches />
    </div>
  </div>
</SvelteUIProvider>

<style>
  .root {
    position: relative;
    background-color: var(--background-secondary);
    color: var(--text-primary);

    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .root::before {
    content: '';
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
    background-image: url('/assets/background.webp');
    background-repeat: no-repeat;
    background-position: 50% 0;
    background-size: cover;
    z-index: -1;
  }

  .active.root::before {
    display: block;
  }

  .main-container {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
    transition: all 250ms;
  }

  main {
    padding: 0.5rem;
    flex: 1;
    min-height: 0;
    display: flex;
    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
    border-radius: 0.5rem;
  }

  @media (max-width: 640px) {
    .main-container {
      padding: 1rem 0.25rem;
    }

    main {
      padding: 0;
    }
  }
</style>
