<script lang="ts">
  import type { LayoutData } from './$types';
  import Overview from '$lib/features/user-profile/overview/Overview.svelte';
  import { goto } from '$app/navigation';

  export let data: LayoutData;

  function onClickDate(date: Date) {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    const formatted = date.toISOString().split('T')[0];

    goto(`/players/${data.user.id}/matches?date=${formatted}`);
  }
</script>

<Overview userId={data.user.id} on:onClickDate={(e) => onClickDate(e.detail)} />
