<script lang="ts">
  import { Mode, type LiveMatch } from '$lib/api/sessions';
  import {
    diffToString,
    lengthToString,
    modeToString,
  } from '$lib/util/enum-to-text';

  import { page } from '$app/stores';

  $: selected = match.session_id === Number($page.params.slug);

  export let match: LiveMatch;
</script>

<a
  class="flex flex-col gap-1 p-2 select-none
  rounded-lg bg-opacity-70
  {!selected && 'hover:bg-red-700 hover:bg-opacity-50'}"
  class:bg-orange-600={selected}
  href="/sessions/{match.session_id}"
>
  <div class="flex justify-between gap-2">
    <div class="keyvalue">
      <div class="key">Server</div>
      <div class="value">
        {match.server.name}
        <span class="font-normal">({modeToString(match.mode)})</span>
      </div>
    </div>
    <div class="keyvalue">
      <div class="key">Zeds left</div>
      <div class="value">
        {#if match.game_data.is_trader_time}
          Trader time
        {:else}
          {match.game_data.zeds_left}
        {/if}
      </div>
    </div>
  </div>
  <div class="flex justify-between gap-2">
    <div class="keyvalue">
      <div class="key">Map</div>
      <div class="value">{match.map.name}</div>
    </div>
    <div class="keyvalue">
      <div class="key">Difficulty</div>
      <div class="value">
        {#if !match.cd_data || !match.cd_data.spawn_cycle}
          <span>{diffToString(match.diff)}</span>
          <span>({lengthToString(match.length)})</span>
        {:else}
          <span>{match.cd_data.spawn_cycle}</span>
          <span>{match.cd_data.max_monsters}mm</span>
          {#if match.cd_data.zeds_type != 'vanilla'}
            <span>{match.cd_data.zeds_type} zeds</span>
          {/if}
        {/if}
      </div>
    </div>
    <div class="keyvalue">
      <div class="key">Wave</div>
      <div class="value">
        {#if match.mode === Mode.Endless}
          {match.game_data.wave}
        {:else if match.game_data.wave > match.length}
          Boss
        {:else}
          {match.game_data.wave} / {match.length}
        {/if}
      </div>
    </div>
  </div>
</a>

<style>
  .keyvalue {
    display: grid;
    grid-auto-columns: auto;
    font-weight: bold;
  }

  .key {
    font-size: 13px;
    color: #9ca3af;
  }

  .value {
    font-size: 16px;
  }
</style>
