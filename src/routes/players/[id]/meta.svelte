<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import { SITE_NAME } from '$lib';
  import type { FilterUsersResponseUser } from '$lib/api/users';

  export let data: FilterUsersResponseUser;

  $: title = `${data.name}'s Profile | ${SITE_NAME}`;
</script>

<MetaTags
  openGraph={{
    title,
    description: '',
    type: 'profile',
    images: [{ url: data.avatar, alt: '' }],
    profile: {
      username: data.name,
    },
  }}
/>
