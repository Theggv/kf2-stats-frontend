<script lang="ts">
  import MetaData from './meta.svelte';
  import Matches from '$lib/features/user-profile/matches/Matches.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<MetaData data={data.user} />

<Matches userId={data.user.id} selectedDate={data.date || ''} />
