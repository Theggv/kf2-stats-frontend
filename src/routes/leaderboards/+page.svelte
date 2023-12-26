<script lang="ts">
  import Leaderboard from '$lib/features/leaderboard-page/Leaderboard.svelte';
  import { page } from '$app/stores';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags {...$page.data.metatags} />

<Leaderboard />
