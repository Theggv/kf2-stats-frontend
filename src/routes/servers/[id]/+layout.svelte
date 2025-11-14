<script lang="ts">
  import { page } from '$app/stores';
  import { MetaTags } from 'svelte-meta-tags';
  import type { LayoutData } from './$types';
  import { ServerPage } from '$lib/pages/servers/[id]';

  export let data: LayoutData;
</script>

<MetaTags {...$page.data.metatags} />

<ServerPage server={data.server}>
  <slot />
</ServerPage>
