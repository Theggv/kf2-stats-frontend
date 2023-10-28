<script lang="ts">
  import { SITE_NAME } from '$lib';
  import SessionList from '$lib/components/session-list/SessionList.svelte';
</script>

<SessionList />

<svelte:head>
  <title>{SITE_NAME} | Matches</title>
</svelte:head>
