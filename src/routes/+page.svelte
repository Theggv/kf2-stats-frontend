<script lang="ts">
  import { SITE_NAME } from '$lib';
  import MainPage from '$lib/features/main-page/MainPage.svelte';
  import { page } from '$app/stores';
  import { getContext } from 'svelte';
  import { AuthContextName, type AuthContextType } from '$lib/hooks';
  import { goto } from '$app/navigation';

  const auth = getContext<AuthContextType>(AuthContextName);
  const { isLogin } = auth;

  function getOpenIdParams(page: typeof $page) {
    const params = new URLSearchParams();
    page.url.searchParams.forEach((value, key) => {
      if (key.startsWith('openid.')) params.set(key, value);
    });

    return params;
  }

  async function clearParams(page: typeof $page, params: URLSearchParams) {
    params.forEach((_, key) => page.url.searchParams.delete(key));

    goto('/', { replaceState: true, invalidateAll: true });
  }

  $: openIdParams = getOpenIdParams($page);
  $: !$isLogin && openIdParams.size > 0 && auth.login(openIdParams);

  $: $isLogin && clearParams($page, openIdParams);
</script>

<svelte:head>
  <title>{SITE_NAME}</title>
</svelte:head>

<MainPage />
