<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';

  export let profile: UserProfile | undefined;
  export let perk: number;
  export let health: number;
  export let armor: number;
  export let buffs: number;
  export let selected: boolean = false;

  $: arr = new Array(buffs).fill(0);
</script>

<div
  class="root"
  class:selected
  role="button"
  tabindex="0"
  on:click
  on:keypress
>
  <div class="avatar">
    <a href={profile?.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={profile?.avatar} alt="" />
    </a>
  </div>

  <div class="name" class:died={health <= 0} title={profile?.name}>
    {profile?.name}
  </div>

  <div class="perk">
    <PerkIcon {perk} prestige={0} />
  </div>

  <progress class="health" max="100" value={health} />
  <progress class="armor" max="100" value={armor} />

  <div class="buffs">
    {#each arr as _, index (index)}
      <div class="buff"></div>
    {/each}
  </div>
</div>

<style>
  .root {
    display: grid;
    grid-template:
      ' perk avatar name armor buffs' auto
      ' perk avatar name health buffs' auto
      / max-content 24px auto 100px 6px;

    align-items: center;
    gap: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 14px;
    padding: 0.125rem 0.25rem;
  }

  .root:not(.selected):hover {
    background: linear-gradient(to right, rgb(0 0 0 / 0), var(--hover-primary));
  }

  .root.selected {
    background: linear-gradient(
      to right,
      rgb(0 0 0 / 0),
      rgba(228, 226, 164, 0.3)
    );
  }

  .root .avatar {
    grid-area: avatar;
    position: relative;
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  .root .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }

  .name {
    grid-area: name;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .died.name:before {
    content: '\1F480';
    padding-right: 0.25rem;
  }

  .buffs {
    grid-area: buffs;

    flex-direction: column;
    display: flex;
    align-self: flex-start;
    line-height: 1.1;

    font-size: 6px;
  }

  .buff::after {
    content: '\2605';
  }

  .perk {
    grid-area: perk;
  }

  .armor {
    grid-area: armor;
  }

  .health {
    grid-area: health;
  }

  .armor,
  .health {
    justify-self: center;
    width: 100%;
    height: 12px;
  }

  progress.armor {
    color: var(--armor-color);
  }

  progress.armor::-moz-progress-bar {
    background: var(--armor-color);
  }

  progress.armor::-webkit-progress-value {
    background: var(--armor-color);
  }
</style>
