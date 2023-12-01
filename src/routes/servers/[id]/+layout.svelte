<script lang="ts">
  import { page } from '$app/stores';
  import ServerPage from '$lib/features/server-page/ServerPage.svelte';
  import { MetaTags } from 'svelte-meta-tags';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<MetaTags {...$page.data.metatags} />

<ServerPage server={data.server}>
  <slot />
</ServerPage>
