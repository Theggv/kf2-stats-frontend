<script lang="ts">
  import type { PageData } from './$types';
  import { MatchPage } from '$lib/pages/matches/[id]';

  export let data: PageData;
</script>

<MatchPage matchId={data.sessionId} />
