<script lang="ts">
  import type { PlayerData } from './data';

  export let data: PlayerData;
  export let online = false;
  export let compact = false;
  export let disableLink = false;
  export let newTab = false;
  export let bold = false;
</script>

<div class="player" class:online class:compact class:bold>
  <div class="avatar">
    <a href={data.profile_url} target="_blank" rel="noopener noreferrer">
      <img src={data.avatar} alt="" />
    </a>
  </div>
  <div class="content">
    {#if disableLink}
      <div class="name">{data.name}</div>
    {:else if newTab}
      <a
        class="name"
        href="/players/{data.id}"
        target="_blank"
        rel="noopener noreferrer">{data.name}</a
      >
    {:else}
      <a class="name" href="/players/{data.id}">{data.name}</a>
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
    position: relative;
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    width: 2.5rem;
    flex-shrink: 0;
    aspect-ratio: 1;
  }

  @media (max-width: 768px) {
    .player .avatar {
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
