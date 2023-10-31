<script lang="ts">
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import AnalyticsMaps from './AnalyticsMaps.svelte';
  import AnalyticsUniquePlayers from './AnalyticsUniquePlayers.svelte';
  import AnalyticsSessionCount from './AnalyticsSessionCount.svelte';
  import AnalyticsUsage from './AnalyticsUsage.svelte';

  export let serverId: number;
</script>

<AutoScroll>
  <div class="root">
    <AnalyticsSessionCount {serverId} />
    <AnalyticsUsage {serverId} />
    <AnalyticsUniquePlayers {serverId} />
    <AnalyticsMaps {serverId} />
  </div>
</AutoScroll>

<style>
  .root {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem;
    gap: 1rem;
  }

  @media (max-width: 1280px) {
    .root {
      grid-template-columns: 1fr;
    }
  }
</style>
