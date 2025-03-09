<script lang="ts">
  import { getContext } from 'svelte';
  import type { getMatchStore } from '../store';
  import { MatchDemoPlayer } from '../components/demo-player';

  const match =
    getContext<ReturnType<typeof getMatchStore>['overview']>('match-overview');
  const demo =
    getContext<ReturnType<typeof getMatchStore>['demo']>('match-demo');
  const users =
    getContext<ReturnType<typeof getMatchStore>['users']>('match-users');
</script>

<div class="root">
  {#if $match && $demo}
    <MatchDemoPlayer data={$demo} users={$users} />
  {/if}
</div>

<style>
  .root {
    flex: 1;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
