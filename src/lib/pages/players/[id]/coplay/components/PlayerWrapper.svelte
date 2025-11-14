<script lang="ts">
  import type { GetLastSeenUsersResponseItem } from '$lib/api/analytics';
  import Player from '$lib/components/player/Player.svelte';

  export let data: GetLastSeenUsersResponseItem;
  export let index = 0;
</script>

<Player profile={data} newTab compact />
