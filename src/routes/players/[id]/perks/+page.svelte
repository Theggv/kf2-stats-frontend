<script lang="ts">
  import type { LayoutData } from '../$types';
  import Perks from '$lib/features/user-profile/perks/Perks.svelte';

  export let data: LayoutData;
</script>

<Perks userId={data.user.id} />
