<script lang="ts">
  import { getContext } from 'svelte';
  import { ContextName, type ContextType } from '../Match.store';
  import { MatchDemoPlayer } from '$lib/features/demo-player';

  const store = getContext<ContextType>(ContextName);
  const { demo, error: demoError } = store.demo;
</script>

<div class="root">
  {#if $demo}
    <MatchDemoPlayer data={$demo} />
  {:else if $demoError}
    <div class="missing">Replay is unavailable</div>
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

  .root .missing {
    margin: 1rem auto;
    font-size: 24px;
    font-weight: bold;
  }
</style>
