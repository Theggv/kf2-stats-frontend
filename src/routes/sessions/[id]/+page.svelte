<script lang="ts">
  import type { PageData } from './$types';
  import { MatchPage } from '$lib/pages/match';

  export let data: PageData;
</script>

<MatchPage matchId={data.sessionId} />
