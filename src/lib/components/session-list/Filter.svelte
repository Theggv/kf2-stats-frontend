<script lang="ts">
  import MultiSelect from 'svelte-multiselect';
  import {
    type SelectOption,
    mapListStore,
    serverListStore,
    difficultyList,
    statusList,
    modeList,
    lengthList,
  } from './store';

  const [servers] = serverListStore();
  const [maps] = mapListStore();

  export let selectedServers: SelectOption[] = [];
  export let selectedMaps: SelectOption[] = [];
  export let selectedDiff: SelectOption[] = [];
  export let selectedMode: SelectOption[] = [];
  export let selectedLength: SelectOption[] = [];
  export let selectedStatus: SelectOption[] = [];
</script>

<div class="root">
  <div class="title">Search Matches</div>
  {#if $servers.length}
    <div class="multiple">
      <MultiSelect
        id="filter_server"
        bind:selected={selectedServers}
        options={$servers.map((x) => ({ id: x.id, label: x.name }))}
        placeholder="Server"
      />
    </div>
  {/if}
  {#if $maps.length}
    <div class="multiple">
      <MultiSelect
        id="filter_map"
        bind:selected={selectedMaps}
        options={$maps.map((x) => ({ id: x.id, label: x.name }))}
        placeholder="Map"
      />
    </div>
  {/if}
  <MultiSelect
    id="filter_difficulty"
    maxSelect={1}
    bind:selected={selectedDiff}
    options={difficultyList}
    placeholder="Difficulty"
  />
  <MultiSelect
    id="filter_status"
    maxSelect={1}
    bind:selected={selectedStatus}
    options={statusList}
    placeholder="Status"
  />
  <MultiSelect
    id="filter_mode"
    maxSelect={1}
    bind:selected={selectedMode}
    options={modeList}
    placeholder="Mode"
  />
  <MultiSelect
    id="filter_length"
    maxSelect={1}
    bind:selected={selectedLength}
    options={lengthList}
    placeholder="Length"
  />
</div>

<style>
  .root {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    z-index: 100;
  }

  .multiple {
    grid-column: span 2;
  }

  .title {
    grid-column: span 4;
    font-weight: bold;
    font-size: 20px;
    padding-top: 0.25rem;
    padding-left: 0.25rem;
  }

  :global(div.multiselect > .selected) {
    min-height: 32px;
  }

  :global(div.multiselect > ul.options) {
    /* dropdown options */
    --sms-options-bg: rgb(40 40 40);
  }

  :global(div.multiselect > ul.options::-webkit-scrollbar) {
    width: 12px;
  }

  :global(div.multiselect > ul.options::-webkit-scrollbar-track) {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  :global(div.multiselect > ul.options::-webkit-scrollbar-thumb) {
    border-radius: 100px;
    background-color: #9ca3af;
  }

  :global(div.multiselect > ul.options > li.selected) {
    /* selected options in the dropdown list */
    background: linear-gradient(to right, var(--selected-primary), transparent);
  }

  :global(div.multiselect > ul.options > li.active),
  :global(div.multiselect > ul.options > li:not(.selected):hover) {
    /* unselected but hovered options in the dropdown list */
    background: linear-gradient(to right, var(--hover-primary), transparent);
  }

  :global(div.multiselect > ul.options > li.disabled) {
    background-color: transparent;
    text-decoration: line-through;
  }
</style>
