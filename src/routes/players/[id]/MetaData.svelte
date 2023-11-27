<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import type { LayoutData } from './$types';

  export let data: LayoutData['metadata'];
</script>

<MetaTags {...data} />
