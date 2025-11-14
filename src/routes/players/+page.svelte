<script lang="ts">
  import { page } from '$app/stores';
  import { PlayersPage } from '$lib/pages/players/index';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags {...$page.data.metatags} />

<PlayersPage />
