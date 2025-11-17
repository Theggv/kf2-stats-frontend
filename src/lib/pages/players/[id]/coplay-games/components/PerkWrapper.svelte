<script lang="ts">
  import type { Match } from '$lib/api/matches';
  import { PerkIcon } from '$lib/ui/icons';

  export let data: Match;
  export let index = 0;

  $: details = data.details as Required<Match['details']>;
</script>

<div class="perks">
  {#each details.user_data.perks as perk (perk)}
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
