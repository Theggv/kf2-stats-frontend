<script lang="ts">
  import type { FindUserSessionsResponseItem } from '$lib/api/analytics';
  import { PerkIcon } from '$lib/ui/icons';

  export let data: FindUserSessionsResponseItem;
  export let index = 0;

  $: perks = data.perks.filter((_, i) => i < 2);
</script>

<div class="perks">
  {#each perks as perk (perk)}
    <PerkIcon {perk} prestige={0} />
  {/each}
</div>

<style>
  .perks {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
    width: 80px;
  }
</style>
