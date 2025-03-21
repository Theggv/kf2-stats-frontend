<script lang="ts">
  import { Icon } from 'svelte-icons-pack';
  import { BsArrowLeft } from 'svelte-icons-pack/bs';
  import { iconSettings } from '$lib/ui/icons';
  import { getContext } from 'svelte';
  import { ContextName, type ContextType } from '../../store';
  import HeaderLayout from './HeaderLayout.svelte';
  import StyledAddress from '$lib/ui/a/StyledAddress.svelte';
  import { ActionIcon } from '@svelteuidev/core';
  import CurrentMatch from './CurrentMatch.svelte';

  const store = getContext<ContextType>(ContextName);
  const { overview } = store.match;
</script>

<HeaderLayout>
  <svelte:fragment slot="title">
    <div class="header">
      {#if $overview}
        <a class="server-name" href="/servers/{$overview.session.server_id}">
          {$overview.server.name}
        </a>

        <div class="address">
          <StyledAddress address={$overview.server.address}>
            {$overview.server.address}
          </StyledAddress>
        </div>

        <div class="date">
          {new Date($overview.session.updated_at).toLocaleString('default', {
            day: 'numeric',
            month: 'short',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </div>
      {/if}
    </div>
  </svelte:fragment>

  <svelte:fragment slot="subtitle">
    {#if $overview}
      <CurrentMatch match={$overview} />
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="icon">
    <ActionIcon variant="transparent" on:click={() => history.back()}>
      <Icon src={BsArrowLeft} {...iconSettings} />
    </ActionIcon>
  </svelte:fragment>

  <svelte:fragment slot="content">
    <slot />
  </svelte:fragment>
</HeaderLayout>

<style>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0rem 1rem;
    flex-wrap: wrap;
  }

  @media (max-width: 1280px) {
    .address {
      display: none;
    }
  }

  .date {
    flex: 1;
    text-align: right;
    color: var(--text-secondary);
    text-wrap: nowrap;
  }

  .server-name {
    font-size: 20px;
    font-weight: bold;
  }
</style>
