<script lang="ts">
  import type { LayoutData } from '../$types';
  import { PlayerMapsTab } from '$lib/pages/players/[id]';

  export let data: LayoutData;
</script>

<PlayerMapsTab userId={data.user.id} />
