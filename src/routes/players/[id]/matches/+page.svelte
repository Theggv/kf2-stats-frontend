<script lang="ts">
  import Matches from '$lib/features/user-profile/matches/Matches.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<Matches userId={data.user.id} selectedDate={data.date || ''} />
