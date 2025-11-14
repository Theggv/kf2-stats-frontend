<script lang="ts">
  import type { GetLastSeenUsersResponseItem } from '$lib/api/analytics';
  import { PerkIcon } from '$lib/ui/icons';

  export let data: GetLastSeenUsersResponseItem;
  export let index = 0;
</script>

<div class="perks">
  {#each data.perks as perk (perk)}
    <PerkIcon {perk} prestige={0} />
  {/each}
</div>

<style>
  .perks {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 150px;
  }
</style>
