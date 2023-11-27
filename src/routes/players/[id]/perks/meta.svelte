<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  import { SITE_NAME } from '$lib';
  import type { FilterUsersResponseUser } from '$lib/api/users';

  export let data: FilterUsersResponseUser;

  $: titleTemplate = `%s | ${SITE_NAME}`;
  $: title = `${data.name}'s Profile > Perks | ${SITE_NAME}`;
  $: description = `${data.name}'s user page`;
</script>

<MetaTags
  {title}
  {titleTemplate}
  {description}
  openGraph={{
    title,
    description,
    type: 'profile',
    images: [{ url: data.avatar, width: 32, height: 32, alt: '' }],
    profile: {
      username: data.name,
    },
  }}
/>
