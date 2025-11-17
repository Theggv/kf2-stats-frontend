<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import { DifficultyIcon } from '$lib/ui/icons';
  import { getMatchDifficulty } from '$lib/util';

  export let data: Match;
  export let index = 0;
</script>

<DifficultyIcon difficulty={getMatchDifficulty(data.metadata.diff)} />
