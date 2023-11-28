<script type="ts">
  import { page } from '$app/stores';
  import { MetaTags } from 'svelte-meta-tags';
</script>

<MetaTags {...$page.data.metatags} />

<svelte:head>
  <meta name="theme-color" content={$page.data.metadata.themeColor} />
</svelte:head>

<slot />
