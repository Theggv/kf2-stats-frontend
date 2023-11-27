<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import { page } from '$app/stores';
</script>

<MetaTags {...$page.data.metadata} />
