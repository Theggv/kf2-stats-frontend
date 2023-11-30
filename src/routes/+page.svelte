<script lang="ts">
  import { SITE_NAME } from '$lib';
  import MainPage from '$lib/features/main-page/MainPage.svelte';
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
</svelte:head>

<MainPage />
