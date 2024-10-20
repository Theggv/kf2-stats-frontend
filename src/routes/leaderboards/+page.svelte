<script lang="ts">
  import { page } from '$app/stores';
  import { LeaderboardPage } from '$lib/pages/leaderboard';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags {...$page.data.metatags} />

<LeaderboardPage />
