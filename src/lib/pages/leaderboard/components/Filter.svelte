<script lang="ts">
  import { getContext } from 'svelte';
  import { LeaderboardCtxKey, type LeaderboardStore } from '../store';
  import { periods } from '../periods';
  import MultiSelect from 'svelte-multiselect';
  import { getStore, type SelectOption } from './Filter.store';
  import { PerkSelector } from '$lib/components/perk-selector';

  const { serverIds, periodIdx, period, perk } =
    getContext<LeaderboardStore>(LeaderboardCtxKey);
  $: selectedPeriod = periods[$periodIdx];

  const { servers } = getStore();
  let selectedServers: SelectOption[] = [];
  $: serverIds.set(selectedServers.map((x) => x.id));

  function changePeriod(previous: boolean) {
    const newPeriod = selectedPeriod.transform!(
      $period.from,
      $period.to,
      previous
    );
    $period = newPeriod;
  }
</script>

<div class="root-leaderboard">
  <div class="perks">
    <PerkSelector bind:perk={$perk} />
  </div>

  <div class="periods">
    <div class="list">
      {#each periods as { label }, index}
        <div
          class:selected={$periodIdx === index}
          role="button"
          tabindex="0"
          on:click={() => periodIdx.set(index)}
          on:keypress={(e) => e.code === 'Enter' && periodIdx.set(index)}
        >
          {label}
        </div>
      {/each}
    </div>

    <div class="controls">
      {#if !selectedPeriod.allTime}
        <div class="label">
          {selectedPeriod.format($period.from, $period.to)}
        </div>
        <div>
          <button on:click={() => changePeriod(true)}>&lt;</button>
          <button on:click={() => changePeriod(false)}>&gt;</button>
        </div>
      {/if}
    </div>
  </div>

  <div class="advanced">
    <div class="content">
      <div class="multiple">
        <MultiSelect
          id="filter_server"
          bind:selected={selectedServers}
          options={$servers.map((x) => ({ id: x.id, label: x.name }))}
          placeholder="Server"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .root-leaderboard {
    padding-top: 0.25rem;
    display: grid;
    grid-template:
      'perks periods' auto
      'advanced advanced' auto
      / auto auto;

    gap: 0.5rem;
  }

  .perks {
    grid-area: perks;
  }

  .periods {
    grid-area: periods;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .advanced {
    grid-area: advanced;

    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .periods > .list {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .periods > .controls,
  .periods > .controls > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .periods > .controls > .label {
    text-wrap: nowrap;
  }

  .selected {
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    .root-leaderboard {
      display: flex;
      flex-direction: column;
    }

    .perks {
      justify-content: center;
    }

    .root-leaderboard,
    .periods,
    .periods > .list {
      align-items: center;
    }

    .root-leaderboard {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  :global(.root-leaderboard div.multiselect > .selected) {
    min-height: 32px;
  }

  :global(.root-leaderboard div.multiselect > ul.options) {
    /* dropdown options */
    --sms-options-bg: rgb(40 40 40);
  }

  :global(.root-leaderboard div.multiselect > ul.options::-webkit-scrollbar) {
    width: 12px;
  }

  :global(
      .root-leaderboard div.multiselect > ul.options::-webkit-scrollbar-track
    ) {
    border-radius: 100px;
    background-color: rgb(212 212 212);
  }

  :global(
      .root-leaderboard div.multiselect > ul.options::-webkit-scrollbar-thumb
    ) {
    border-radius: 100px;
    background-color: #9ca3af;
  }

  :global(.root-leaderboard div.multiselect > ul.options > li.selected) {
    /* selected options in the dropdown list */
    background: linear-gradient(to right, var(--selected-primary), transparent);
  }

  :global(.root-leaderboard div.multiselect > ul.options > li.active),
  :global(
      .root-leaderboard div.multiselect > ul.options > li:not(.selected):hover
    ) {
    /* unselected but hovered options in the dropdown list */
    background: linear-gradient(to right, var(--hover-primary), transparent);
  }

  :global(.root-leaderboard div.multiselect > ul.options > li.disabled) {
    background-color: transparent;
    text-decoration: line-through;
  }
</style>
