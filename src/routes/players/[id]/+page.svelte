<script lang="ts">
  import { page } from '$app/stores';
  import { SITE_NAME } from '$lib';
  import Player from '$lib/components/player/Player.svelte';
  import ListLayout from '$lib/layouts/ListLayout.svelte';
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

  $: online = !!$user?.current_session;
</script>

<svelte:head>
  {#if $user}
    <title>{$user.name}'s Profile | {SITE_NAME}</title>
  {:else}
    <title>Players | {SITE_NAME}</title>
  {/if}
</svelte:head>

<ListLayout>
  <svelte:fragment slot="header">
    <div class="header">
      {#if $loading}
        <HeaderSkeleton />
      {:else if $user}
        <Player data={$user} {online} disableLink />
        <div class="last-seen">
          {#if online}
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
  </svelte:fragment>

  <svelte:fragment slot="content">
    <Tabs />
    {#each tabs as tab (tab.href)}
      {#if isTabSelected(selected, tab) && tab.component}
        <svelte:component this={tab.component} userId={data.userId} />
      {/if}
    {/each}
  </svelte:fragment>
</ListLayout>

<style>
  .header {
    padding: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .header .last-seen {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }
</style>
