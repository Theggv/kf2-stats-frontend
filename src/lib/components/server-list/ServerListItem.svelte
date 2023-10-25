<script lang="ts">
  import type { ServerData } from '$lib/api/servers';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import StyledLink from '$lib/ui/a/StyledLink.svelte';

  export let server: ServerData;
  export let index: number;
</script>

<div class="index">
  {index + 1}
</div>
<StyledLink
  class="server-list-name"
  href="/servers/{server.id}"
  rounded={false}
>
  {server.name}
</StyledLink>
<StyledAddress address={server.address}>
  {server.address}
</StyledAddress>

<style>
  .index {
    user-select: none;
    text-align: right;
  }

  :global(.server-list-name) {
    padding: 0.25rem;
  }
</style>
