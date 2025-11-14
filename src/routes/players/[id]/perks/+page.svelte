<script lang="ts">
  import type { LayoutData } from '../$types';
  import { PlayerPerksTab } from '$lib/pages/players/[id]';

  export let data: LayoutData;
</script>

<PlayerPerksTab userId={data.user.id} />
