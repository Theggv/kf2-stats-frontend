<script lang="ts">
  import { MultiSelect } from 'svelte-multiselect';
  import { convertZedType, getStore, type SelectOption } from './Filter.store';
  import { getContext } from 'svelte';
  import {
    ServerPageMatchesName,
    type ServerPageMatchesType,
  } from './Matches.store';
  import { parseFilterExpr } from '$lib/util';
  import type { ServerData } from '$lib/api/servers';

  const { maps, statuses, zedsTypes } = getStore();

  const store = getContext<ServerPageMatchesType>(ServerPageMatchesName);
  const { filter } = store;

  let selectedMaps: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];
  let selectedZedsType: SelectOption[] = [];

  let wave: string = '';
  let spawnCycle: string = '';
  let maxMonsters: string = '';
  let calcDiff: string = '';

  $: filter.update((prev) => ({
    ...prev,
    map_ids: selectedMaps.map((x) => x.id),
    statuses: selectedStatus.map((x) => x.id),
    extra: {
      wave: parseFilterExpr(wave),
      max_monsters: parseFilterExpr(maxMonsters),
      difficulty: parseFilterExpr(calcDiff),
      spawn_cycle: spawnCycle || undefined,
      zeds_type: selectedZedsType.length
        ? convertZedType(selectedZedsType[0])
        : undefined,
    },
  }));
</script>

<div class="filter-container">
  <div class="servers">
    <div class="title">Map Filter</div>

    {#if $maps.length}
      <MultiSelect
        id="filter_map"
        maxSelect={1}
        bind:selected={selectedMaps}
        options={$maps.map((x) => ({ id: x.id, label: x.name }))}
        placeholder="Map"
      />
    {/if}
  </div>

  <div class="filters">
    <div class="title">Game Filters</div>

    <MultiSelect
      id="filter_status"
      bind:selected={selectedStatus}
      options={statuses}
      placeholder="Status"
    />

    <input class="input" placeholder="Wave" bind:value={wave} type="text" />

    <input
      class="input"
      placeholder="Match Difficulty"
      bind:value={calcDiff}
      type="text"
    />
  </div>

  <div class="advanced">
    <div class="title">CD Settings</div>

    <input class="input" placeholder="Spawn cycle" bind:value={spawnCycle} />
    <input
      class="input"
      placeholder="Max Monsters"
      bind:value={maxMonsters}
      type="text"
    />
    <MultiSelect
      id="filter_zeds_type"
      maxSelect={1}
      bind:selected={selectedZedsType}
      options={zedsTypes}
      placeholder="Zeds type"
    />
  </div>
</div>

<style>
  .filter-container {
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;

    gap: 1rem;
  }

  .servers,
  .filters,
  .advanced {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .title {
    padding-left: 0.5rem;
    font-size: 12px;
    font-weight: bold;
    color: var(--text-secondary);
    opacity: 0.75;
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
