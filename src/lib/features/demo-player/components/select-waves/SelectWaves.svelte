<script lang="ts">
  import type { DemoRecordAnalysisWave } from '$lib/api/sessions/demo';
  import Select from 'svelte-select';
  import SelectWavesItem from './SelectWavesItem.svelte';
  import { onMount } from 'svelte';

  export let items: DemoRecordAnalysisWave[];
  export let selectedIndex: number;
  export let value: DemoRecordAnalysisWave | undefined;

  let listOpen = false;

  function handleClickWave(index: number) {
    selectedIndex = index;
    listOpen = false;
  }

  let el: HTMLElement;

  onMount(() => {
    function handleScroll(ev: WheelEvent) {
      if (ev.deltaY > 0) {
        selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      } else if (ev.deltaY < 0) {
        selectedIndex = Math.max(selectedIndex - 1, 0);
      }
    }

    el.addEventListener('wheel', handleScroll);

    return () => {
      el.removeEventListener('wheel', handleScroll);
    };
  });
</script>

<Select
  bind:input={el}
  on:keydown={(e) => console.log(e)}
  class="waves-select"
  bind:listOpen
  {value}
  {items}
  clearable={false}
  containerStyles={'background: transparent;'}
  hideEmptyState
  showChevron
  listAutoWidth
  --list-background="rgb(40 40 40)"
  --border="1px solid rgb(255 255 255 / 0.5)"
  --list-border-radius="0 0 5px 5px"
  --item-first-border-radius="0"
  --border-radius={listOpen ? '5px 5px 0 0' : '5px'}
>
  <div let:selection slot="selection" class="item">
    <SelectWavesItem item={selection} />
  </div>

  <div
    slot="list"
    let:filteredItems
    style={'background: rgb(0 0 0 / 0.1) !important;'}
  >
    {#each filteredItems as item, index (`${index} ${item.meta_data.start_tick}`)}
      <div
        class="item"
        role="button"
        tabindex="0"
        on:click={() => handleClickWave(index)}
        on:keypress={(e) => e.key === 'Enter' && handleClickWave(index)}
      >
        <SelectWavesItem {item} />
      </div>
    {/each}
  </div>
</Select>

<style>
  .item {
    padding: 0.25rem 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    cursor: pointer;
    border-radius: 0.25rem;
    user-select: none;
  }

  .item:hover {
    background-color: rgb(255 255 255 / 0.1);
  }
</style>
