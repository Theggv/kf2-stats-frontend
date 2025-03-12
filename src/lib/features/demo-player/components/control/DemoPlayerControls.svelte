<script lang="ts">
  import { Scatter } from 'svelte-chartjs';
  import type { DemoRecordAnalysisWave } from '$lib/api/sessions/demo';
  import type {
    ActiveElement,
    Chart,
    ChartEvent,
    ScriptableContext,
  } from 'chart.js';
  import { lineHoverPlugin } from './line-hover-plugin';
  import {
    prepareDeathDataset,
    prepareDifficultyDataset,
    prepareZedtimeDataset,
  } from './DemoPlayerControls.data';
  import { externalTooltipHandler } from './DemoPlayerControls.tooltip';

  export let wave: DemoRecordAnalysisWave;
  export let currentTick: number;

  $: start_tick = wave.meta_data.start_tick;
  $: end_tick = wave.meta_data.end_tick;

  $: difficulty = prepareDifficultyDataset(wave);
  $: zedtime = prepareZedtimeDataset(wave);
  $: deaths = prepareDeathDataset(wave);

  $: hovered = false;
  $: hoverTick = start_tick;

  const suppressTypeError = (data: any) => data;

  function onTickChange(tick: number) {
    hoverTick = tick;
  }

  function isSelectedZedtime(
    tick: number,
    zt: (typeof zedtime.dataset)[number]
  ) {
    return tick >= zt[0].x && tick <= zt[1].x;
  }

  function setBorderColor(ctx: ScriptableContext<'line'>) {
    const canvas = ctx.chart.ctx;
    const gradient = canvas.createLinearGradient(0, 0, 0, ctx.chart.height);

    gradient.addColorStop(0, '#ca3226a0');
    gradient.addColorStop(1, '#30a329a0');

    return gradient;
  }

  function setBackgroundColor(ctx: ScriptableContext<'line'>) {
    const canvas = ctx.chart.ctx;
    const gradient = canvas.createLinearGradient(0, 0, 0, ctx.chart.height);

    gradient.addColorStop(0, '#ca322640');
    gradient.addColorStop(1, '#30a32910');

    return gradient;
  }

  function handleClick(event: ChartEvent, _: ActiveElement[], chart: Chart) {
    if (event.x == null) return;

    const scale = chart.scales['x'];
    const value = scale.getValueForPixel(event.x);

    if (!value) return;

    currentTick = Math.round(value);
  }

  function handleMouseMove(
    event: ChartEvent,
    _: ActiveElement[],
    chart: Chart
  ) {
    if ((event.native as any).buttons & 1) handleClick(event, _, chart);
  }
</script>

<div
  role="none"
  class="demo-player-control"
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}
>
  {#if difficulty.dataset.length}
    <Scatter
      plugins={[lineHoverPlugin]}
      options={{
        animation: {
          duration: 0,
        },
        spanGaps: true,
        scales: {
          x: {
            min: start_tick,
            max: end_tick,
            ticks: { display: false },
            grid: { display: false },
          },
          y: {
            suggestedMin: 0,
            suggestedMax: 50,
            ticks: { display: false },
            grid: { display: false },
          },
        },
        maintainAspectRatio: false,
        resizeDelay: 0,
        interaction: {
          mode: 'x',
          intersect: true,
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
        elements: {
          point: {
            pointStyle: 'circle',
            hoverRadius: 0,
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            mode: 'index',
            intersect: false,
            yAlign: 'bottom',
            position: 'nearest',
            caretPadding: 8,
            external: externalTooltipHandler(onTickChange),
          },
        },
        onClick: handleClick,
        onHover: handleMouseMove,
      }}
      data={{
        datasets: [
          ...zedtime.dataset.map((data) => ({
            label: 'zedtime',
            data,
            fill: false,
            borderColor: isSelectedZedtime(hoverTick, data)
              ? '#eecf24'
              : '#f1da5c',
            borderWidth: 4,
            tension: 0.4,
            showLine: true,
            disableInteraction: true,
            order: 2,
          })),
          ...deaths.dataset.map((data) => ({
            label: 'deaths',
            data,
            fill: false,
            borderColor: '#6d1b0ec0',
            borderWidth: 4,
            tension: 0.4,
            showLine: true,
            disableInteraction: true,
            order: 5,
          })),
          {
            label: 'difficulty',
            data: suppressTypeError(difficulty.dataset),
            fill: true,
            borderColor: setBorderColor,
            backgroundColor: setBackgroundColor,
            tension: 0.4,
            borderWidth: 2,
            showLine: true,
            order: 4,
          },
          {
            label: 'timeline-selected',
            data: [start_tick, Math.max(start_tick, currentTick)].map((x) => ({
              x,
              y: 1,
            })),
            fill: true,
            borderColor: '#cc433d',
            pointBorderColor: '#c43730',
            borderWidth: 5,
            pointRadius: 1,
            pointBorderWidth: 10,
            pointHoverRadius: 1,
            pointHoverBorderColor: '#c43730',
            pointHoverBorderWidth: 10,
            showLine: true,
            order: 1,
          },
          {
            label: 'timeline-hover',
            data: [start_tick, Math.max(start_tick, hoverTick)].map((x) => ({
              x,
              y: 1,
            })),
            fill: true,
            borderColor: 'rgb(200 200 200 / 0.7)',
            borderWidth: 4,
            showLine: true,
            order: 3,
            hidden: !hovered,
          },
          {
            label: 'timeline',
            data: [start_tick, end_tick].map((x) => ({
              x,
              y: 1,
            })),
            fill: true,
            borderColor: 'rgb(100 100 100 / 0.9)',
            borderWidth: 4,
            showLine: true,
            order: 4,
          },
        ],
      }}
    />
  {/if}
</div>

<style>
  .demo-player-control {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    flex: 1;
    display: flex;
  }

  :global(.demo-player-control > canvas) {
    max-width: 100%;
    max-height: 50px;
    min-height: 50px;
    opacity: 0.5;

    transition-behavior: allow-discrete;
    transition-property: opacity, max-height, min-height;
    transition-delay: 50ms;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
  }

  :global(.demo-player-control > canvas:hover) {
    max-height: 100px;
    min-height: 100px;
    opacity: 1;
  }
</style>
