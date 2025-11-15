<script lang="ts">
  import type { Match } from '$lib/api/matches/filter';
  import { getWaveText } from '$lib/util/converters';

  export let data: Match;
  export let index = 0;

  $: details = data.details as Required<Match['details']>;
</script>

<div class="wave">
  <div class="content">
    <div class="title">Wave</div>
    <div>
      {getWaveText(details.game_data.wave, data.session)}
    </div>
  </div>
</div>

<style>
  .wave {
    text-align: center;
    width: 100px;
  }

  .content {
    padding-right: 3rem;
    text-align: center;
  }

  .title {
    color: var(--text-secondary);
    font-size: 14px;
  }
</style>
