<script lang="ts">
  import type { Match } from '$lib/api/matches/filter';
  import { PerkIcon } from '$lib/ui/icons';

  export let data: Match;
  export let index = 0;

  $: details = data.details as Required<Match['details']>;
  $: perks = details.user_data.perks.filter((_, i) => i < 2);
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
