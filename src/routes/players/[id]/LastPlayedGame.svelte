<script lang="ts">
  import type { FilterUsersResponseUserSession } from '$lib/api/users';
  import { getWaveText } from '$lib/util/converters';
  import {
    modeToString,
    diffToString,
    statusToString,
  } from '$lib/util/enum-to-text';

  export let data: FilterUsersResponseUserSession | undefined = undefined;
</script>

{#if data}
  <div>
    <div class="column">
      <div>
        <h4>Map</h4>
        <div>{data.map_name}</div>
      </div>

      <div>
        <h4>Mode</h4>
        <div>
          {modeToString(data.mode)}
        </div>
      </div>

      <div>
        <h4>Difficulty</h4>
        <div>
          {#if !data.cd_data || !data.cd_data.spawn_cycle}
            {diffToString(data.diff)}
          {:else}
            <span>{data.cd_data.spawn_cycle}</span>
            <span>{data.cd_data.max_monsters}mm</span>
            {#if data.cd_data.zeds_type != 'vanilla'}
              <span>{data.cd_data.zeds_type} zeds</span>
            {/if}
          {/if}
        </div>
      </div>

      <div>
        <h4>Wave</h4>
        <div>{getWaveText(data.wave, data)}</div>
      </div>

      <div>
        <h4>Status</h4>
        <div>
          {statusToString(data.status)}
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="not-found">Last Session was not found.</div>
{/if}

<style>
  .column {
    display: flex;
    flex-direction: row;
    font-weight: bold;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .not-found {
    display: flex;
    align-items: center;
    height: 44px;
  }

  .column h4 {
    font-size: 13px;
    color: #9ca3af;
  }

  .selected .column h4 {
    color: #bfc4ce;
  }

  .column > div {
    font-size: 16px;
  }
</style>
