<script lang="ts">
  import type { UserProfile } from '$lib/api/common';

  export let profile: Omit<UserProfile, 'auth_id'>;
  export let online = false;
  export let compact = false;
  export let disableLink = false;
  export let newTab = false;
  export let bold = false;
</script>

<div class="player" class:online class:compact class:bold>
  <div class="avatar">
    <a href={profile.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={profile.avatar} alt="" />
    </a>
  </div>
  <div class="content">
    {#if disableLink}
      <div class="name">{profile.name}</div>
    {:else if newTab}
      <a
        class="name"
        href="/players/{profile.id}"
        target="_blank"
        rel="noopener noreferrer">{profile.name}</a
      >
    {:else}
      <a class="name" href="/players/{profile.id}">{profile.name}</a>
    {/if}
    <slot />
  </div>
</div>

<style>
  .player {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .player .avatar {
    margin: 2px;
    position: relative;
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    width: 2.5rem;
    flex-shrink: 0;
    aspect-ratio: 1;
  }

  @media (max-width: 768px) {
    .player .avatar {
      margin: 0;
      outline: none;
    }
  }

  .player .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }

  .online.player .avatar::after {
    position: absolute;
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 100px;
    background-color: rgba(55, 180, 27);
    bottom: -4px;
    right: -4px;
  }

  .compact.player .avatar {
    width: 1.5rem;
  }

  .player .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .player .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .player.bold .name {
    font-weight: bold;
  }
</style>
