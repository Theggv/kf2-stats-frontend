<script lang="ts">
  import type { PlayTimeHistItem } from '$lib/api/analytics';
  import { writable } from 'svelte/store';
  import { treshholds } from './Playtime.store';
  import { createEventDispatcher } from 'svelte';
  import { ActivityCalendar } from '$lib/components/activity-calendar';
  import { Tabs } from '$lib/components/tabs';

  export let data: PlayTimeHistItem[] = [];
  export let maxDays = 45;

  const dispatch = createEventDispatcher();

  $: totalHours = (data.reduce((acc, x) => acc + x.minutes, 0) / 60).toFixed(1);
  $: totalCount = data.reduce((acc, x) => acc + x.count, 0);

  const tabs = ['Playtime', 'Matches'];
  const selectedTab = writable(0);

  $: treshhold = treshholds[$selectedTab];

  function onClickDate(date: Date) {
    dispatch('onClickDate', date);
  }
</script>

<div class="root">
  <Tabs {tabs} bind:selectedTab={$selectedTab} />

  <ActivityCalendar
    period="45-days"
    {data}
    {treshhold}
    on:click={(e) => onClickDate(e.detail)}
  >
    <div slot="caption">
      {#if $selectedTab === 0}
        {totalHours} hours past {maxDays} days
      {:else if $selectedTab === 1}
        {totalCount} matches past {maxDays} days
      {/if}
    </div>
  </ActivityCalendar>
</div>

<style>
  .root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
