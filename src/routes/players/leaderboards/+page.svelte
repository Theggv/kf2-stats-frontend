<script lang="ts">
  import PlayersTop from '$lib/features/players-page/leaderboards/PlayersTop.svelte';
  import PlayersPage from '$lib/features/players-page/PlayersPage.svelte';
  import { page } from '$app/stores';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags {...$page.data.metatags} />

<PlayersPage>
  <PlayersTop />
</PlayersPage>
