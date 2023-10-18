<script lang="ts">
  import type { PageData } from './$types';
  import SessionList from './SessionList.svelte';

  export let data: PageData;
</script>

<div>
  {#await data.streamed.server}
    <div>loading</div>
  {:then value}
    {#if value.type === 'success'}
      <div>Value: {value.data.address}</div>
    {:else}
      <div>
        <div>Something went wrong.</div>
        <div>Code {value.status}</div>
        <div>Message {value.message}</div>
      </div>
    {/if}
  {/await}

  <SessionList serverId={data.serverId} />
</div>

<svelte:head>
  <title>KF2 Stats</title>
</svelte:head>
