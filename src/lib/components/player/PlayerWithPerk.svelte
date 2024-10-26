<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import type { MatchWavePlayer } from '$lib/api/matches';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { perkToString } from '$lib/util/enum-to-text';

  export let profile: UserProfile;
  export let playerData: Pick<
    MatchWavePlayer,
    'is_dead' | 'perk' | 'level' | 'prestige'
  >;
  export let selected = false;
</script>

<div class="player">
  <div class="perk-icon">
    <PerkIcon perk={playerData.perk} prestige={playerData.prestige} />
  </div>
  <div
    on:click
    on:keypress
    on:dblclick={() => window.open(`/players/${profile.id}`, '_blank')}
    role="button"
    tabindex="0"
    class="info"
    class:selected
  >
    <div class="name" class:died={playerData.is_dead} title={profile.name}>
      {profile.name}
    </div>
    <div class="perk">
      {playerData.level}
      {perkToString(playerData.perk)}
    </div>
  </div>
  <div class="avatar">
    <a href={profile.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={profile.avatar} alt="" />
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
    font-size: 12px;
  }

  .avatar {
    margin: 2px;
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
