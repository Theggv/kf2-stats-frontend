<script lang="ts">
  import type { PopularServersResponseItem } from '$lib/api/analytics';
  import StyledLink from '$lib/ui/a/StyledLink.svelte';
  import { diffToString } from '$lib/util/enum-to-text';

  export let data: PopularServersResponseItem[];
</script>

<div class="root">
  {#each data as server, index (server.id)}
    <StyledLink href="/servers/{server.id}">
      <div class="server">
        <div class="number">{index + 1}</div>
        <div class="name" title={server.name}>{server.name}</div>
        <div class="diff">{diffToString(server.diff)}</div>
        <div class="metric">Players</div>
        <div class="count">{server.total_users}</div>
      </div>
    </StyledLink>
  {/each}
</div>

<style>
  .root {
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .server {
    padding: 0 0.5rem;
    display: grid;
    grid-template:
      'number name metric' auto
      'number diff count' auto
      / 1rem 1fr auto;
    gap: 0 0.5rem;

    font-size: 12px;
    font-weight: bold;
    color: var(--text-secondary);
  }

  .server > .name {
    grid-area: name;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--text-primary);
  }

  .server > .diff {
    grid-area: diff;
  }

  .server > .metric {
    grid-area: metric;
    text-align: right;
  }

  .server > .count {
    grid-area: count;
    text-align: right;
    color: var(--text-primary);
  }
</style>
