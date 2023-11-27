<script lang="ts">
  import { SITE_NAME } from '$lib';
  import type { FilterUsersResponseUser } from '$lib/api/users';

  export let data: FilterUsersResponseUser;

  $: title = `${data.name}'s Profile | ${SITE_NAME}`;
</script>

<svelte:head>
  <title>{title}</title>

  <meta property="og:title" content={title} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:image" content={data.avatar} />
</svelte:head>
