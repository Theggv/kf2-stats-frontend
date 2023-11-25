<script lang="ts">
  import { SITE_NAME } from '$lib';

  export let userName: string;
</script>

<svelte:head>
  <title>{userName}'s Profile | {SITE_NAME}</title>
</svelte:head>
