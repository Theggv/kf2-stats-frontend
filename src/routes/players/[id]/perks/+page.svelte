<script lang="ts">
  import MetaData from './meta.svelte';
  import type { LayoutData } from '../$types';
  import Perks from '$lib/features/user-profile/perks/Perks.svelte';

  export let data: LayoutData;
</script>

<MetaData data={data.user} />

<Perks userId={data.user.id} />
