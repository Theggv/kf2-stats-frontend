import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { FilterUsersResponseUser } from '$lib/api/users';
import { SITE_NAME } from '$lib';

export const load: LayoutServerLoad = async ({ params, fetch }) => {
  const userId = Number(params.id);
  if (isNaN(userId)) {
    throw error(400, 'user_id is not a number');
  }

  const user: FilterUsersResponseUser = await fetch(
    `/api/users/${userId}/detailed`
  ).then((x) => {
    if (!x.ok) throw error(x.status, { message: 'user was not found' });
    return x.json();
  });

  return {
    user,
    metadata: {
      title: `${user.name}'s Profile | ${SITE_NAME}`,
      openGraph: {
        title: `${user.name}'s Profile | ${SITE_NAME}`,
        type: 'profile',
        images: [{ url: user.avatar, width: 32, height: 32, alt: '' }],
        profile: {
          username: user.name,
        },
      },
    },
  };
};
