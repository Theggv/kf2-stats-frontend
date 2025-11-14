<script lang="ts">
  import type { FindUserSessionsResponseItem } from '$lib/api/analytics';
  import { DifficultyIcon } from '$lib/ui/icons';
  import { getMatchDifficulty } from '$lib/util';

  export let data: FindUserSessionsResponseItem;
  export let index = 0;
</script>

<DifficultyIcon difficulty={getMatchDifficulty(data.metadata.diff)} />
