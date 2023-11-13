<script lang="ts">
  import { page } from '$app/stores';
  import { SITE_NAME } from '$lib';
  import type { PageData } from './$types';
  import HeaderSkeleton from './HeaderSkeleton.svelte';
  import LastPlayedGame from './LastPlayedGame.svelte';
  import LastPlayedGameSkeleton from './LastPlayedGameSkeleton.svelte';
  import Tabs from './Tabs.svelte';
  import { isTabSelected, tabs, userStore } from './store';

  export let data: PageData;

  $: selected = $page.url.hash;

  const [user, loading, error, fetchUser] = userStore();
  $: fetchUser(data.userId);

  $: isOnline = !!$user?.current_session;
</script>

<svelte:head>
  {#if $user}
    <title>{$user.name}'s Profile | {SITE_NAME}</title>
  {:else}
    <title>Players | {SITE_NAME}</title>
  {/if}
</svelte:head>

<div class="root">
  <div class="header">
    {#if $loading}
      <HeaderSkeleton />
    {:else if $user}
      <div class="player" class:online={isOnline}>
        <div class="avatar">
          <a href={$user.profile_url} target="_blank" rel="noopener noreferrer">
            <img src={$user.avatar} alt="" />
          </a>
        </div>
        <div class="name">{$user.name}</div>
      </div>
      <div class="last-seen">
        {#if isOnline}
          Online
        {:else}
          Last seen: {new Date($user.updated_at).toLocaleString('default')}
        {/if}
      </div>
    {/if}
  </div>
  <div class="recent-session">
    {#if $loading}
      <LastPlayedGameSkeleton />
    {:else if $user}
      <LastPlayedGame data={$user.current_session ?? $user.last_session} />
    {/if}
  </div>
  <hr />
  <Tabs />
  {#each tabs as tab (tab.href)}
    {#if isTabSelected(selected, tab) && tab.component}
      <svelte:component this={tab.component} userId={data.userId} />
    {/if}
  {/each}
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;

    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .header {
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .header .player {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header .player .avatar {
    position: relative;
    outline: 2px solid var(--text-primary);
    border-radius: 0.25rem;
    width: 2.5rem;
    height: 2.5rem;
    flex-shrink: 0;
  }

  .header .player .avatar img {
    width: 100%;
    border-radius: 0.25rem;
  }

  .header .online.player .avatar::after {
    position: absolute;
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    border-radius: 100px;
    background-color: darkgreen;
    bottom: -5px;
    right: -5px;
  }

  .header .player .name {
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .header .last-seen {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }
</style>
