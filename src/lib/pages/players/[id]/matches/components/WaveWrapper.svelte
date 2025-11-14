<script lang="ts">
  import type { FindUserSessionsResponseItem } from '$lib/api/analytics';
  import { getWaveText } from '$lib/util/converters';

  export let data: FindUserSessionsResponseItem;
  export let index = 0;
</script>

<div class="wave">
  <div class="content">
    <div class="title">Wave</div>
    <div>
      {getWaveText(data.game_data.wave, data.session)}
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
