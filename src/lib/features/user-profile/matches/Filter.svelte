<script lang="ts">
  import { MultiSelect } from 'svelte-multiselect';
  import { getStore, type SelectOption } from './Filter.store';
  import { Mode } from '$lib/api/sessions';
  import { onMount, onDestroy } from 'svelte';

  const { difficulties, maps, modes, perks, statuses } = getStore();

  export let selectedPerks: SelectOption[] = [];
  export let selectedMaps: SelectOption[] = [];
  export let selectedDiff: SelectOption[] = [];
  export let selectedMode: SelectOption[] = [];
  export let selectedStatus: SelectOption[] = [];
  export let selectedSpawnCycle: string;
  export let minWave: number;
  export let minMaxMonsters: number;

  export let selectedDate: string;

  let inputRef: HTMLInputElement;

  const onFocus = () => (inputRef.type = 'date');
  const onBlur = () => (inputRef.type = 'text');

  onMount(() => {
    inputRef.addEventListener('focus', onFocus);
    inputRef.addEventListener('blur', onBlur);
  });

  onDestroy(() => {
    inputRef.removeEventListener('focus', onFocus);
    inputRef.removeEventListener('blur', onBlur);
  });
</script>

<div class="filter-container">
  <input
    bind:this={inputRef}
    class="input"
    bind:value={selectedDate}
    type="text"
    placeholder="Date"
  />
  <MultiSelect
    id="filter_perks"
    maxSelect={1}
    bind:selected={selectedPerks}
    options={perks}
    placeholder="Perk"
  />
  {#if $maps.length}
    <MultiSelect
      id="filter_map"
      maxSelect={1}
      bind:selected={selectedMaps}
      options={$maps.map((x) => ({ id: x.id, label: x.name }))}
      placeholder="Map"
    />
  {/if}
  <MultiSelect
    id="filter_mode"
    maxSelect={1}
    bind:selected={selectedMode}
    options={modes}
    placeholder="Game Mode"
  />
  <MultiSelect
    id="filter_status"
    maxSelect={1}
    bind:selected={selectedStatus}
    options={statuses}
    placeholder="Status"
  />
  {#if !selectedMode.length || selectedMode[0].id !== Mode.ControlledDifficulty}
    <MultiSelect
      id="filter_difficulty"
      maxSelect={1}
      bind:selected={selectedDiff}
      options={difficulties}
      placeholder="Difficulty"
    />
  {/if}
  <input
    class="input"
    placeholder="Min wave"
    bind:value={minWave}
    type="number"
  />
  {#if selectedMode.length && selectedMode[0].id === Mode.ControlledDifficulty}
    <input
      class="input"
      placeholder="Spawn cycle"
      bind:value={selectedSpawnCycle}
    />
    <input
      class="input"
      placeholder="Min mm"
      bind:value={minMaxMonsters}
      type="number"
    />
  {/if}
</div>

<style>
  .filter-container {
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .input {
    background: transparent;
    border-radius: 0.25rem;
    border: 1px solid var(--text-primary);
    height: 32px;
    padding: 0.5rem;
    padding-left: 1rem;
    font-weight: bold;
    color: var(--text-secondary);
    font-size: 12px;
  }

  .input::placeholder {
    color: var(--text-secondary);
    font-size: 14px;
  }

  :global(.filter-container .selected) {
    min-height: 32px;
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: bold;
  }

  :global(.filter-container div.multiselect > ul.selected > li) {
    font-size: 12px;
  }

  :global(.filter-container div.multiselect > ul.options) {
    /* dropdown options */
    --sms-options-bg: rgb(40 40 40);
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: bold;
  }

  :global(.filter-container div.multiselect > ul.options::-webkit-scrollbar) {
    width: 12px;
  }

  :global(
      .filter-container div.multiselect > ul.options::-webkit-scrollbar-track
    ) {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  :global(
      .filter-container div.multiselect > ul.options::-webkit-scrollbar-thumb
    ) {
    border-radius: 100px;
    background-color: #9ca3af;
  }

  :global(.filter-container div.multiselect > ul.options > li) {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  :global(.filter-container div.multiselect > ul.options > li.selected) {
    /* selected options in the dropdown list */
    background: linear-gradient(to right, var(--selected-primary), transparent);
  }

  :global(.filter-container div.multiselect > ul.options > li.active),
  :global(
      .filter-container div.multiselect > ul.options > li:not(.selected):hover
    ) {
    /* unselected but hovered options in the dropdown list */
    background: linear-gradient(to right, var(--hover-primary), transparent);
  }

  :global(.filter-container div.multiselect > ul.options > li.disabled) {
    background-color: transparent;
    text-decoration: line-through;
  }
</style>
