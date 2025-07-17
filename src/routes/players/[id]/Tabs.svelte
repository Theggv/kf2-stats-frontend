<script lang="ts">
  import { tabs } from './Tabs.store';
  import { page } from '$app/stores';
  import { getContext } from 'svelte';
  import { AuthContextName, type AuthContextType } from '$lib/hooks';

  export let userId: number;

  const auth = getContext<AuthContextType>(AuthContextName);
  const { user } = auth;

  function shouldRender(
    userId: number,
    user: typeof $user,
    tab: (typeof tabs)[number]
  ) {
    if (!tab.show) return true;
    if (!user) return false;

    if (tab.show === 'user-profile') return user.user_id === userId;
    else if (tab.show === 'another-user') return user.user_id !== userId;

    return false;
  }
</script>

<ul>
  {#each tabs as tab (tab.href)}
    {#if shouldRender(userId, $user, tab)}
      {@const href = `/players/${userId}${tab.href}`}

      <li class:selected={[href, href + '/'].includes($page.url.pathname)}>
        <a {href}>{tab.content}</a>
      </li>
    {/if}
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  li {
    padding: 0.25rem 0.5rem;
    font-weight: bold;
    border-bottom: 2px solid transparent;
  }

  .selected {
    border-bottom: 2px solid var(--text-primary);
  }
</style>
