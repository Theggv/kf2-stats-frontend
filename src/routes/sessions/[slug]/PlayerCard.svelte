<script lang="ts">
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import type { Player } from '$lib/api/matches';
  import { perkToString } from '$lib/util/enum-to-text';

  export let player: Player;
  export let selected: boolean;
</script>

<div class="player">
  <div class="perk-icon">
    <PerkIcon perk={player.perk} prestige={player.prestige} />
  </div>
  <div
    on:click
    on:keypress
    role="button"
    tabindex="0"
    class="info"
    class:selected
  >
    <div class="name" class:died={player.is_dead} title={player.name}>
      {player.name}
    </div>
    <div class="perk">
      {player.level}
      {perkToString(player.perk)}
    </div>
  </div>
  <div class="avatar">
    <a href={player.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={player.avatar} alt="" />
    </a>
  </div>
</div>

<style>
  .player {
    display: grid;
    grid-template:
      'icon info avatar' 1fr
      / max-content 1fr max-content;
    align-items: center;
    gap: 0 0.5rem;
    user-select: none;
  }

  .info {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    overflow: hidden;
  }

  .perk-icon {
    grid-area: icon;
    scale: 1.1;
  }

  .name {
    grid-area: name;

    text-align: left;
    font-size: 16px;
    padding: 0 0.5rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    border-bottom: 2px solid var(--text-primary);
  }

  .died.name:before {
    content: '\1F480';
    padding-right: 0.25rem;
  }

  .info:not(.selected):hover .name {
    background-color: var(--hover-primary);
  }

  .selected .name {
    background-color: var(--selected-primary);
  }

  .perk {
    position: relative;
    grid-area: perk;
    text-align: right;
  }

  .avatar {
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    grid-area: avatar;
    width: 2.5rem;
    height: 2.5rem;
  }

  .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }
</style>
