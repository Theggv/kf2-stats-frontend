<script lang="ts">
  import { page } from '$app/stores';
  import PlayersPage from '$lib/features/players-page/PlayersPage.svelte';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags {...$page.data.metatags} />

<PlayersPage />
