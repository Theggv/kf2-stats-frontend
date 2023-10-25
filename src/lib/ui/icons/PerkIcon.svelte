<script lang="ts">
  import { Perk } from '$lib/api/matches';

  const defaultPerkIcon = '/assets/perks/survivalist.png';

  const perkIcons = {
    [Perk.Berserker]: '/assets/perks/berserker.png',
    [Perk.Commando]: '/assets/perks/commando.png',
    [Perk.Medic]: '/assets/perks/medic.png',
    [Perk.Sharpshooter]: '/assets/perks/sharpshooter.png',
    [Perk.Gunslinger]: '/assets/perks/gunslinger.png',
    [Perk.Support]: '/assets/perks/support.png',
    [Perk.Swat]: '/assets/perks/swat.png',
    [Perk.Demolitionist]: '/assets/perks/demolitionist.png',
    [Perk.Firebug]: '/assets/perks/firebug.png',
    [Perk.Survivalist]: '/assets/perks/survivalist.png',
  };

  const prestigeIcons: any = {
    [1]: '/assets/perks/prestige1.png',
    [2]: '/assets/perks/prestige2.png',
    [3]: '/assets/perks/prestige3.png',
    [4]: '/assets/perks/prestige4.png',
    [5]: '/assets/perks/prestige5.png',
  };

  export let perk: Perk;
  export let prestige: number;
</script>

<div class="root">
  {#if prestige > 0}
    <img class="prestige" src={prestigeIcons[prestige] || ''} alt="" />
    <img
      class="inside"
      class:prestige-1={prestige === 1}
      class:prestige-2={prestige === 2}
      class:prestige-3={prestige === 3}
      src={perkIcons[perk] || defaultPerkIcon}
      alt=""
    />
  {:else}
    <img class="perk" src={perkIcons[perk] || defaultPerkIcon} alt="" />
  {/if}
</div>

<style>
  .root {
    position: relative;
    width: 2rem;
    height: 2rem;
  }

  .prestige {
    position: absolute;
    height: 2rem;
  }

  .perk {
    position: absolute;
    height: 1.5rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .inside {
    position: absolute;
    height: 1.3rem;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -60%);
  }

  .prestige-3,
  .prestige-2 {
    transform: translate(-50%, -65%);
  }

  .prestige-1 {
    transform: translate(-53%, -65%);
  }
</style>
