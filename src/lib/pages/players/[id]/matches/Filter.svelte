<script lang="ts">
  import { MultiSelect } from 'svelte-multiselect';
  import { getStore, type SelectOption, convertZedType } from './Filter.store';
  import { GameMode } from '$lib/api/sessions';
  import { getContext } from 'svelte';
  import {
    UserProfileMatchesName,
    type UserProfileMatchesType,
  } from './Matches.store';
  import { parseFilterExpr } from '$lib/util';

  const { difficulties, maps, modes, servers, lengths, statuses, zedsTypes } =
    getStore();

  const store = getContext<UserProfileMatchesType>(UserProfileMatchesName);
  const { filter, activity, year } = store;

  let perk: number = 0;
  let selectedMaps: SelectOption[] = [];
  let selectedServers: SelectOption[] = [];
  let selectedDiff: SelectOption[] = [];
  let selectedMode: SelectOption[] = [];
  let selectedStatus: SelectOption[] = [];
  let selectedLength: SelectOption[] = [];
  let selectedZedsType: SelectOption[] = [];
  let spawnCycle: string;

  let wave: string = '';
  let maxMonsters: string = '';
  let calcDiff: string = '';

  $: filter.update((prev) => ({
    ...prev,
    perks: perk ? [perk] : undefined,
    server_ids: selectedServers.map((x) => x.id),
    map_ids: selectedMaps.map((x) => x.id),
    diff: selectedDiff.length ? selectedDiff[0].id : undefined,
    statuses: selectedStatus.map((x) => x.id),
    mode: selectedMode.length ? selectedMode[0].id : undefined,
    length: selectedLength.length ? selectedLength[0].id : undefined,
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
    <div class="title">Server & Map</div>

    {#if $servers.length}
      <MultiSelect
        id="filter_server"
        bind:selected={selectedServers}
        options={$servers.map((x) => ({ id: x.id, label: x.name }))}
        placeholder="Server"
      />
    {/if}

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
      id="filter_difficulty"
      maxSelect={1}
      bind:selected={selectedDiff}
      options={difficulties}
      placeholder="Game Difficulty"
    />

    <MultiSelect
      id="filter_status"
      bind:selected={selectedStatus}
      options={statuses}
      placeholder="Status"
    />

    <MultiSelect
      id="filter_mode"
      maxSelect={1}
      bind:selected={selectedMode}
      options={modes}
      placeholder="Game Mode"
    />

    <MultiSelect
      id="filter_length"
      maxSelect={1}
      bind:selected={selectedLength}
      options={lengths}
      placeholder="Game Length"
    />

    <input class="input" placeholder="Wave" bind:value={wave} type="text" />

    <input
      class="input"
      placeholder="Match Difficulty"
      bind:value={calcDiff}
      type="text"
    />
  </div>

  {#if selectedMode.length && selectedMode[0].id === GameMode.ControlledDifficulty}
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
  {/if}
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
