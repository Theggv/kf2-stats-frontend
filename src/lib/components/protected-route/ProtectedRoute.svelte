<script lang="ts">
  import { goto } from '$app/navigation';

  export let hasAccess: boolean;
  export let redirect: string;

  $: !hasAccess && goto(redirect, { invalidateAll: true, replaceState: true });
</script>

{#if hasAccess}
  <slot />
{/if}
