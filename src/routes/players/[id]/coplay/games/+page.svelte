<script lang="ts">
  import type { LayoutData } from '../../$types';
  import { getContext } from 'svelte';
  import { type AuthContextType, AuthContextName } from '$lib/hooks';
  import { ProtectedRoute } from '$lib/components/protected-route';
  import { PlayerCoplayGamesTab } from '$lib/pages/players/[id]';

  export let data: LayoutData;

  const auth = getContext<AuthContextType>(AuthContextName);
  const { user } = auth;

  $: hasAccess = !!$user && $user.user_id !== data.user.id;
</script>

<ProtectedRoute {hasAccess} redirect={`/players/${data.user.id}`}>
  {#if $user}
    <PlayerCoplayGamesTab userId={$user.user_id} otherUserId={data.user.id} />
  {/if}
</ProtectedRoute>
