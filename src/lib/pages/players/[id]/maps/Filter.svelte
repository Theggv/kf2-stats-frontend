<script lang="ts">
  import { MultiSelect } from 'svelte-multiselect';
  import { getStore } from './Filter.store';
  import { getContext } from 'svelte';
  import { UserProfileMapsName, type UserProfileMapsType } from './Maps.store';

  const filte = getStore();
  const { servers, selectedServerIds, filter: filterStore } = filte;

  const { filter } = getContext<UserProfileMapsType>(UserProfileMapsName);

  $: filter.update(() => $filterStore);
</script>

<div class="filter-container">
  {#if $servers.length}
    <MultiSelect
      id="filter_servers"
      bind:selected={$selectedServerIds}
      options={$servers.map((x) => ({ id: x.id, label: x.name }))}
      placeholder="Server"
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

  :global(.filter-container .selected) {
    min-height: 32px;
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: bold;
  }

  :global(.filter-container div.multiselect > ul.selected > li) {
    font-size: 12px;
    max-width: 20ch;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
