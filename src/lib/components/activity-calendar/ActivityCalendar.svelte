<script lang="ts">
  import { getDayNames, getMonthNames } from '$lib/util/date';
  import { createEventDispatcher } from 'svelte';
  import type { Treshhold } from './ActivityCalendar.data';

  type T = $$Generic<{ period: string }>;

  export let data: T[];
  export let treshhold: Treshhold<T>;
  export let period: 'month' | '45-days' | '90-days' | 'year' = 'month';
  export let to: Date = new Date();
  export let clickBehaviour: 'select' | 'range' = 'select';

  $: mappedData = new Map(
    data.map((x) => [new Date(x.period).toDateString(), x])
  );

  $: rangeFrom = -1;
  $: rangeTo = -1;
  $: hoveredIndex = -1;

  $: to && clearRange();

  $: totalDays = transformPeriod(period);
  $: small = ['90-days', 'year'].includes(period);

  const dispatch = createEventDispatcher<{
    click: Date;
    rangeSelected: { from: Date; to: Date };
    rangeClear: {};
  }>();

  const days = getDayNames();
  const months = getMonthNames();

  const msInDay = 1000 * 60 * 60 * 24;
  $: filler = (3710 + to.getDay() - totalDays + 1) % 7;

  function getColor(treshhold: Treshhold<T>, hovered: boolean, item?: T) {
    const colors =
      hovered && treshhold.altColors ? treshhold.altColors : treshhold.colors;

    if (!item) return colors[0];

    for (let i = 0; i < treshhold.values.length; i++) {
      if (!treshhold.values[i]) continue;
      if (treshhold.evaluate(item) <= treshhold.values[i]) return colors[i];
    }

    return colors[colors.length - 1];
  }

  function onClickDate(date: Date, index: number, value?: T) {
    if (clickBehaviour === 'range') {
      if (index >= 0 && rangeTo >= 0) {
        clearRange();
      }

      if (index >= 0 && rangeFrom >= 0) {
        let min = Math.min(index, rangeFrom);
        let max = Math.max(index, rangeFrom);

        dispatch('rangeSelected', {
          from: new Date(to.getTime() - msInDay * (totalDays - min - 1)),
          to: new Date(to.getTime() - msInDay * (totalDays - max - 1)),
        });

        rangeFrom = min;
        rangeTo = max;
        hoveredIndex = -1;

        return;
      }

      rangeFrom = index;
      hoveredIndex = index;
    }

    if (!value) return;
    dispatch('click', date);
  }

  function clearRange() {
    rangeFrom = -1;
    rangeTo = -1;
    dispatch('rangeClear', {});
  }

  function transformPeriod(p: typeof period): number {
    if (p === 'month') return 30;
    if (p === '45-days') return 45;
    if (p === '90-days') return 90;
    if (p === 'year') return 365;

    return 0;
  }

  function isInRange(index: number, from: number, to: number) {
    if (from < 0) return false;
    return index >= from && index <= to;
  }
</script>

<div class="root" class:small>
  {#if $$slots['caption']}
    <div class="secondary">
      <slot name="caption" />
    </div>
  {/if}

  <div
    class="calendar"
    role="button"
    on:dblclick={() => clearRange()}
    tabindex="0"
  >
    <div class="filler" />
    {#each days as day (day)}
      <div class="day-name secondary">{day}</div>
    {/each}
    <div class="filler" />
    {#each new Array(filler) as _}
      <div class="filler" />
    {/each}
    {#each new Array(totalDays) as _, index}
      {@const date = new Date(to.getTime() - msInDay * (totalDays - index - 1))}
      {@const value = mappedData.get(date.toDateString())}
      {@const hover = isInRange(
        index,
        Math.min(rangeTo >= 0 ? rangeTo : hoveredIndex, rangeFrom),
        Math.max(rangeTo >= 0 ? rangeTo : hoveredIndex, rangeFrom)
      )}

      <div
        class="cell"
        class:hover
        role="button"
        on:click={() => onClickDate(date, index, value)}
        on:keypress={(e) =>
          e.code === 'Enter' && onClickDate(date, index, value)}
        on:mouseenter={() =>
          clickBehaviour === 'range' &&
          rangeFrom >= 0 &&
          rangeTo < 0 &&
          (hoveredIndex = index)}
        on:mouseleave={() =>
          clickBehaviour === 'range' &&
          rangeFrom >= 0 &&
          rangeTo < 0 &&
          (hoveredIndex = -1)}
        tabindex="0"
      >
        <div
          class="content"
          style="background-color: {getColor(treshhold, hover, value)};"
        />
        <div class="tooltip">
          {@html treshhold.tooltip(date, value)}
        </div>
      </div>

      {#if (filler + index) % 7 === 6}
        {@const nextWeek = new Date(
          to.getTime() - msInDay * (totalDays - index - 8)
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
      <div class="value secondary">{treshhold.values[index]}</div>
    {/each}
  </div>
</div>

<style>
  .root {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: max-content;
  }

  .calendar {
    display: grid;
    grid-template-rows: repeat(8, 1fr);
    grid-auto-flow: column dense;
    justify-content: start;
    align-items: center;
  }

  .filler,
  .cell {
    padding: 2px;
    width: 20px;
    aspect-ratio: 1;
  }

  .cell {
    position: relative;
    display: flex;
  }

  .cell .content {
    position: relative;
    border-radius: 0.25rem;
    flex: 1;
  }

  .cell.hover .content {
    border-radius: 0.25rem;
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
    font-size: 10px;

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

  .root.small .grades {
    gap: 2px;
  }

  .root.small .filler,
  .root.small .cell {
    padding: 1.5px;
    width: 14px;
  }

  .root.small .cell .content {
    border-radius: 0.125rem;
  }

  .root.small .day-name,
  .root.small .month-name {
    height: 10px;
  }

  .root.small .day-name {
    font-size: 7px;
  }

  .root.small .month-name,
  .root.small .grades .value {
    display: flex;
    align-items: center;
    font-size: 10px;
  }

  .root.small .grades {
    gap: 2px 3px;
  }

  .root.small .grades .value {
    justify-content: center;
  }
</style>
