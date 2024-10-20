<script lang="ts">
  import type { UserProfile } from '$lib/api/common';
  import type { MatchWavePlayer } from '$lib/api/matches';
  import PerkIcon from '$lib/ui/icons/PerkIcon.svelte';
  import { perkToString } from '$lib/util/enum-to-text';
  import { createMediaStore } from 'svelte-media-queries';

  type PlayerData = Pick<
    MatchWavePlayer,
    'user_id' | 'perk' | 'level' | 'is_dead' | 'prestige'
  >;

  export let profile: UserProfile | undefined;
  export let playerData: PlayerData | undefined;

  export let active = false;
  export let hover = false;

  const media = createMediaStore('(max-width: 640px)');
</script>

<div
  class="player"
  class:hover
  on:mouseenter
  on:mouseleave
  role="rowheader"
  tabindex="-1"
>
  <div class="avatar" class:compact={$media}>
    {#if profile}
      <a href={profile.profile_url} target="_blank" rel="noopener noreferrer">
        <img src={profile.avatar} alt="" />
      </a>
    {/if}
  </div>

  <div
    on:click
    on:keypress
    on:dblclick={() =>
      profile && window.open(`/players/${profile.id}`, '_blank')}
    role="button"
    tabindex="0"
    class="content"
    class:active
  >
    {#if profile}
      <div class="name" class:died={playerData?.is_dead}>
        {profile.name}
      </div>
    {/if}

    {#if playerData}
      <div class="perk-icon">
        <PerkIcon perk={playerData.perk} prestige={playerData.prestige} />
      </div>

      <div class="perk">
        {playerData.level}
        {#if !$media}
          {perkToString(playerData.perk)}
        {/if}
      </div>
    {:else}
      <div class="perk">—</div>
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
    gap: 0 0.5rem;
    user-select: none;

    background: linear-gradient(to right, rgb(0 0 0 / 0), rgb(0 0 0 / 0.25));
  }

  .avatar {
    grid-area: avatar;

    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    aspect-ratio: 1;
    height: 2.5rem;
  }

  .avatar.compact {
    height: 1.5rem;
    outline: none;
  }

  .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }

  .content {
    grid-area: content;

    display: grid;
    grid-template:
      'name name' 24px
      'icon perk' 24px
      / max-content 1fr;
    align-items: center;
    gap: 2px 0.5rem;
    user-select: none;

    cursor: pointer;
    overflow: hidden;
    height: 52px;
    padding-right: 0.25rem;
  }

  .name {
    grid-area: name;
    position: relative;

    text-align: left;
    font-size: 16px;
    padding: 0 0.5rem 4px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .name::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background: linear-gradient(
      to right,
      rgb(212 212 212 / 0.25),
      rgb(212 212 212 / 0) 80%
    );
  }

  .died.name:before {
    content: '\1F480';
    padding-right: 0.25rem;
  }

  .perk-icon {
    grid-area: icon;

    padding-left: 0.25rem;
    scale: 0.75;
  }

  .perk {
    grid-area: perk;

    position: relative;
    color: var(--text-secondary);
    font-size: 14px;
  }

  .player:not(.active).hover {
    background: linear-gradient(to right, rgb(0 0 0 / 0), var(--hover-primary));
  }

  .active .name {
    background-color: var(--selected-primary);
  }

  @media (max-width: 640px) {
    .player {
      gap: 0 0.25rem;
    }
  }
</style>
