<script lang="ts">
  import { PlayerMatchesTab } from '$lib/pages/players/[id]';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<PlayerMatchesTab userId={data.user.id} />
