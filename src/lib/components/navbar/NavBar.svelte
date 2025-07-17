<script lang="ts">
  import { Icon } from 'svelte-icons-pack';

  import MediaQuery from 'svelte-media-queries';

  import Link from './Link.svelte';
  import Logo from './Logo.svelte';
  import { links } from './data';
  import { iconSettings } from '$lib/ui/icons';
  import { page } from '$app/stores';
  import { getContext } from 'svelte';
  import { AuthContextName, type AuthContextType } from '$lib/hooks';
  import Player from '../player/Player.svelte';

  const auth = getContext<AuthContextType>(AuthContextName);
  const { isLogin, user, logout } = auth;

  const steamOpenIdUrl = new URL('https://steamcommunity.com/openid/login');
  const params: Record<string, string> = {
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': $page.url.origin,
    'openid.realm': $page.url.origin,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select',
  };

  Object.entries(params).forEach(([key, value]) =>
    steamOpenIdUrl.searchParams.set(key, value)
  );
</script>

<ul class="root">
  <MediaQuery query="(min-width: 480px)" let:matches>
    {#if matches}
      <Logo />
    {/if}
  </MediaQuery>
  {#each links as link (link.href)}
    <MediaQuery query="(max-width: 1024px)" let:matches>
      {#if matches}
        <Link href={link.href}>
          <Icon src={link.icon} {...iconSettings} />
        </Link>
      {:else}
        <Link href={link.href} title={link.title} />
      {/if}
    </MediaQuery>
  {/each}

  <li class="last">
    {#if $isLogin && $user}
      <Player
        profile={{
          id: $user.user_id,
          name: $user.name,
          avatar: $user.avatar,
          profile_url: $user.profile_url,
        }}
      />
      <button class="logout" on:click={() => logout()}>Logout</button>
    {:else}
      <a href={steamOpenIdUrl.href}>
        <img
          src="https://community.fastly.steamstatic.com/public/images/signinthroughsteam/sits_01.png"
          alt="Login Button"
          width="180"
          height="35"
        />
      </a>
    {/if}
  </li>
</ul>

<style>
  .root {
    display: flex;
    gap: 0.5rem;
    padding: 0.25rem 1rem;
    width: 100%;
  }

  .last {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  ul {
    background-color: var(--background-primary);
    backdrop-filter: blur(10px);
  }
</style>
