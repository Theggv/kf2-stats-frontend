<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextName, type ContextType } from '../store';
  import { MatchDemoPlayer } from '$lib/features/demo-player';

  const store = getContext<ContextType>(ContextName);
  const { demo } = store.demo;
  const { users } = store.match;
</script>

<div class="root">
  {#if $demo}
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
