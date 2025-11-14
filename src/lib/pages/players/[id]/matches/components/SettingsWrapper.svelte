<script lang="ts">
  import type { FindUserSessionsResponseItem } from '$lib/api/analytics';
  import { Mode } from '$lib/api/sessions';
  import { DifficultyIcon } from '$lib/ui/icons';
  import { getMatchDifficulty } from '$lib/util';
  import { modeToString, diffToString } from '$lib/util/enum-to-text';

  export let data: FindUserSessionsResponseItem;
  export let index = 0;
</script>

<div class="settings">
  <div class="title list">
    <span>
      {modeToString(data.session.mode, false)}
    </span>
    {#if data.session.mode !== Mode.Endless}
      <span>
        ({data.session.length} Waves)
      </span>
    {/if}
  </div>
  <div class="list">
    {#if data.extra_game_data}
      <span>
        {data.extra_game_data.spawn_cycle}
      </span>
      <span>
        {data.extra_game_data.max_monsters}mm
      </span>
      {#if data.extra_game_data.zeds_type.toLowerCase() !== 'vanilla'}
        <span>
          {data.extra_game_data.zeds_type.toLowerCase()} zeds
        </span>
      {/if}
    {:else}
      <span>
        {diffToString(data.session.diff)}
      </span>
    {/if}
  </div>
</div>

<style>
  .title {
    color: var(--text-secondary);
    font-size: 12px;
  }

  .list,
  .list > * {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
  }

  .list > *::after {
    font-size: 10px;
    content: '•';
    color: var(--text-secondary);
  }

  .list > *:last-child::after {
    display: none;
    margin: 0;
  }

  .settings {
    display: flex;
    flex-direction: column;
    text-wrap: nowrap;
    width: 240px;
    font-size: 12px;
  }

  .settings .game-info span {
    text-wrap: nowrap;
  }
</style>
