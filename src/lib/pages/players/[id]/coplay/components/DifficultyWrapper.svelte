<script lang="ts">
  import type { GetLastSeenUsersResponseItem } from '$lib/api/analytics';
  import { DifficultyIcon } from '$lib/ui/icons';
  import { getMatchDifficulty } from '$lib/util';

  export let data: GetLastSeenUsersResponseItem;
  export let index = 0;
</script>

<DifficultyIcon difficulty={getMatchDifficulty(data.match.metadata.diff)} />
