<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import type { MatchWavePlayer } from '$lib/api/matches';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { perkToString } from '$lib/util/enum-to-text';

  type PlayerData = Pick<MatchWavePlayer, 'perk' | 'level' | 'prestige'>;

  export let profile: UserProfile;
  export let playerData: PlayerData | undefined = undefined;
</script>

<div class="player" on:mouseenter on:mouseleave role="rowheader" tabindex="-1">
  <div class="avatar">
    <a href={profile.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={profile.avatar} alt="" />
    </a>
  </div>

  <div class="content">
    {#if profile}
      <div class="name">
        {profile.name}
      </div>
    {/if}

    {#if playerData}
      <div class="perk-icon">
        <PerkIcon perk={playerData.perk} prestige={playerData.prestige} />
      </div>

      <div class="perk">
        {playerData.level}
        {perkToString(playerData.perk)}
      </div>
    {/if}
  </div>
</div>

<style>
  .player {
    display: grid;
    grid-template:
      'avatar content' auto
      / max-content 1fr;
    align-items: center;
    gap: 0.5rem;
    user-select: none;
  }

  .avatar {
    grid-area: avatar;

    outline: 2px solid var(--text-primary);
    width: 20px;
    height: 20px;
  }

  .avatar img {
    width: 100%;
  }

  .content {
    grid-area: content;

    display: grid;
    grid-template:
      'name perk icon' 24px
      /1fr max-content max-content;
    align-items: center;
    user-select: none;

    cursor: pointer;
    overflow: hidden;
  }

  .perk-icon {
    grid-area: icon;

    scale: 0.65;
  }

  .perk {
    grid-area: perk;
    padding-right: 0.25rem;
  }

  .name {
    grid-area: name;
    position: relative;

    text-align: left;
    font-size: 14px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
