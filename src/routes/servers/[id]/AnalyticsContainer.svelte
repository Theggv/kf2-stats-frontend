<script lang="ts">
  import AutoScroll from '$lib/components/auto-scroll/AutoScroll.svelte';
  import AnalyticsMaps from '$lib/components/server-analytics/AnalyticsMaps.svelte';
  import AnalyticsPerksKills from '$lib/components/server-analytics/AnalyticsPerksKills.svelte';
  import AnalyticsPerksPlayTime from '$lib/components/server-analytics/AnalyticsPerksPlayTime.svelte';
  import AnalyticsSessionCount from '$lib/components/server-analytics/AnalyticsSessionCount.svelte';
  import AnalyticsUniquePlayers from '$lib/components/server-analytics/AnalyticsUniquePlayers.svelte';
  import AnalyticsUsage from '$lib/components/server-analytics/AnalyticsUsage.svelte';

  export let serverId: number;
</script>

<AutoScroll>
  <div class="root">
    <AnalyticsSessionCount {serverId} />
    <AnalyticsUsage {serverId} />
    <AnalyticsUniquePlayers {serverId} />
    <AnalyticsMaps {serverId} />
    <AnalyticsPerksPlayTime {serverId} />
    <AnalyticsPerksKills {serverId} />
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
