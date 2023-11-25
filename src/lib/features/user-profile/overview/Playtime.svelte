<script lang="ts">
  import type { PlayTimeHistItem } from '$lib/api/analytics';
  import { getDayNames, getMonthNames } from '$lib/util/date';
  import { writable } from 'svelte/store';
  import { treshholds, type Treshhold } from './Playtime.store';
  import { createEventDispatcher } from 'svelte';

  export let data: PlayTimeHistItem[] = [];
  export let maxDays = 45;

  const dispatch = createEventDispatcher();

  $: totalHours = (data.reduce((acc, x) => acc + x.minutes, 0) / 60).toFixed(1);
  $: totalCount = data.reduce((acc, x) => acc + x.count, 0);

  const days = getDayNames();
  const months = getMonthNames();

  const msInDay = 1000 * 60 * 60 * 24;
  const filler = (3710 + new Date().getDay() - maxDays + 1) % 7;

  const tabs = ['Playtime', 'Matches'];
  const selectedTab = writable(0);

  $: treshhold = treshholds[$selectedTab];

  function findByDate(data: PlayTimeHistItem[], date: Date) {
    return data.find(
      (x) => new Date(x.period).toDateString() === date.toDateString()
    );
  }

  function getColor(treshhold: Treshhold, item?: PlayTimeHistItem) {
    if (!item) return treshhold.colors[0];

    for (let i = 0; i < treshhold.values.length; i++) {
      if (!treshhold.values[i]) continue;
      if (treshhold.evaluate(item) <= treshhold.values[i])
        return treshhold.colors[i];
    }

    return treshhold.colors[treshhold.colors.length - 1];
  }

  function onClickDate(date: Date, value: PlayTimeHistItem | undefined) {
    if (!value) return;
    dispatch('onClickDate', date);
  }
</script>

<div class="root">
  <ul>
    {#each tabs as tab, index (tab)}
      <li class:selected={$selectedTab === index}>
        <div
          on:click={() => selectedTab.set(index)}
          on:keypress={(e) => e.code === 'Enter' && selectedTab.set(index)}
          role="button"
          tabindex="0"
        >
          {tab}
        </div>
      </li>
    {/each}
  </ul>

  <div class="secondary">
    {#if $selectedTab === 0}
      {totalHours} hours past {maxDays} days
    {:else if $selectedTab === 1}
      {totalCount} matches past {maxDays} days
    {/if}
  </div>

  <div class="calendar">
    <div class="filler" />
    {#each days as day (day)}
      <div class="day-name secondary">{day}</div>
    {/each}
    <div class="filler" />
    {#each new Array(filler) as _}
      <div class="filler" />
    {/each}
    {#each new Array(maxDays) as _, index}
      {@const date = new Date(Date.now() - msInDay * (maxDays - index - 1))}
      {@const value = findByDate(data, date)}

      <div
        class="cell"
        style="background-color: {getColor(treshhold, value)};"
        role="button"
        on:click={() => onClickDate(date, value)}
        on:keypress={(e) => e.code === 'Enter' && onClickDate(date, value)}
        tabindex="0"
      >
        <div class="tooltip">
          {@html treshhold.tooltip(date, value)}
        </div>
      </div>

      {#if (filler + index) % 7 === 6}
        {@const nextWeek = new Date(
          Date.now() - msInDay * (maxDays - index - 8)
        )}

        {#if date.getMonth() !== nextWeek.getMonth()}
          <div class="filler month-name secondary">
            {months[nextWeek.getMonth()]}
          </div>
        {:else}
          <div class="filler" />
        {/if}
      {/if}
    {/each}
  </div>

  <div class="grades">
    <div class="title secondary">{treshhold.title}</div>
    {#each treshhold.values as _, index (index)}
      <div class="cell" style="background-color: {treshhold.colors[index]};" />
      <div class="secondary">{treshhold.values[index]}</div>
    {/each}
  </div>
</div>

<style>
  .root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .root > ul {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    font-weight: bold;
  }

  .root > ul > li {
    border-bottom: 2px solid transparent;
  }

  .root > ul > .selected {
    border-bottom-color: var(--text-primary);
  }

  .calendar {
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    grid-auto-flow: column dense;
    gap: 3px;
    justify-content: start;
    align-items: center;
  }

  .filler,
  .cell {
    width: 20px;
    aspect-ratio: 1;
  }

  .cell {
    position: relative;
    background: rgba(200, 200, 250, 0.15);
    border-radius: 0.25rem;
    display: flex;
  }

  .tooltip {
    position: absolute;
    visibility: hidden;
    background: rgba(0, 0, 0, 0.7);
    width: max-content;
    font-size: 14px;
    border-radius: 0.5rem;
    padding: 0.25rem 1rem;
    left: 50%;
    bottom: 26px;
    z-index: 1;
    transform: translate(-50%, 0);
    display: flex;
    flex-direction: column;
    color: var(--text-secondary);
    pointer-events: none;
  }

  .tooltip::after {
    position: absolute;
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    left: 50%;
    bottom: -4px;

    border-top: 4px solid rgba(0, 0, 0, 0.7);
  }

  .cell:hover .tooltip {
    visibility: visible;
  }

  .secondary {
    font-weight: bold;
    color: var(--text-secondary);
  }

  .day-name,
  .month-name {
    font-size: 14px;

    padding-right: 0.5rem;
  }

  .grades {
    padding-top: 1rem;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: 1fr;
    grid-auto-flow: column dense;
    gap: 6px;
    justify-content: start;
    align-items: center;
    text-align: center;
  }

  .grades .title {
    font-size: 12px;
    grid-row: span 2;
    align-self: start;
    text-align: left;
    padding-right: 0.5rem;
  }
</style>
