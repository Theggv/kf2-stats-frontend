<script>
  import Footer from '$lib/components/Footer.svelte';
  import LiveMatches from '$lib/components/live-matches/LiveMatches.svelte';
  import NavBar from '$lib/components/navbar/NavBar.svelte';
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
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  let active = false;

  onMount(() => (active = true));
</script>

<svelte:head>
  <title>Better Stats</title>
</svelte:head>

<div class="root" class:active>
  <header><NavBar /></header>
  <div class="main-container container mx-auto px-4">
    <main>
      <slot />
    </main>
    <LiveMatches />
  </div>
  <Footer />
</div>

<style>
  .root {
    position: relative;
    background-color: var(--background-secondary);
    color: var(--text-primary);

    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    background-image: url('/assets/background.png');
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
    transition: all 250ms;
  }

  main {
    padding: 0.5rem;
    flex: 1;
    min-height: 0;
    display: flex;
    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
  }
</style>
