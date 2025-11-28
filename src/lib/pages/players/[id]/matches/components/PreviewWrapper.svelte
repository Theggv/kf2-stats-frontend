<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import { MapPreview } from '$lib/ui/img';
  export let data: Match;
  export let index = 0;

  $: details = data.details as Required<Match['details']>;
</script>

<div class="preview">
  <MapPreview data={details.map.name} />
</div>

<style>
  .preview {
    display: flex;
    width: 72px;
  }
</style>
