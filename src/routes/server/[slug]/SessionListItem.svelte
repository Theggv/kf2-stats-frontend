<script lang="ts">
  import type { SessionData } from '$lib/api/sessions';
  import {
    diffToString,
    lengthToString,
    modeToString,
    statusToString,
  } from '$lib/util/enum-to-text';

  import { selectedSession } from './store';
  import { quartInOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  let el: HTMLDivElement;

  function onClick() {
    selectedSession.update((prev) => (prev === data.id ? null : data.id));
  }

  $: selected = $selectedSession === data.id;
  $: height = tweened(0, {
    duration: 500,
    easing: quartInOut,
  });

  $: height.set(selected ? 100 : 0);

  export let data: SessionData;
</script>

<tr
  on:click={onClick}
  class="transition-all duration-150
  grad text-zinc-400
  select-none"
  class:selected
>
  <td class="p-2"><div>{diffToString(data.diff)}</div></td>
  <td class="p-2">{data.map?.name ?? data.map_id}</td>
  <td class="p-2">{modeToString(data.mode)}</td>
  <td class="p-2">{lengthToString(data.length)}</td>
  <td class="p-2">{statusToString(data.status)}</td>
</tr>

{#if selected}
  <tr class="text-zinc-400">
    <td colspan="5">
      <div
        class="selected-item p-2"
        style="max-height: {$height * 10}px"
        bind:this={el}
      >
        <div>data</div>
        <div>data</div>
        <div>data</div>
        <div>data</div>
        <div>data</div>
      </div>
    </td>
  </tr>
{/if}

<style lang="postcss">
  @property --gradient-from {
    syntax: '<color>';
    initial-value: transparent;
    inherits: false;
  }

  @property --gradient-to {
    syntax: '<color>';
    initial-value: transparent;
    inherits: false;
  }

  td {
    z-index: 5;
  }

  .grad {
    position: relative;

    background: linear-gradient(
      to right,
      var(--gradient-from),
      var(--gradient-to) 100%
    );
    transition: --gradient-from 150ms;
  }

  .grad:hover {
    --gradient-from: #1e3a8a80;
    --gradient-to: transparent;
  }

  .selected {
    --gradient-from: #1e40af80;
  }

  .selected-item {
    position: relative;
    overflow: hidden;
    min-height: 0px;
    height: auto;
    transition: all 300ms;
    z-index: 0;
  }
</style>
