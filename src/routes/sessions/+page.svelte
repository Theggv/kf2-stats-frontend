<script lang="ts">
  import { SITE_NAME } from '$lib';
  import SessionList from '$lib/components/session-list/SessionList.svelte';
</script>

<svelte:head>
  <title>Matches | {SITE_NAME}</title>
</svelte:head>

<SessionList />
