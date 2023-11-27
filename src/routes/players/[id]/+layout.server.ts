import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { FilterUsersResponseUser } from '$lib/api/users';
import { SITE_NAME } from '$lib';

export const load: LayoutServerLoad = async ({ params, fetch }) => {
  const userId = Number(params.id);
  if (isNaN(userId)) {
    throw error(400, 'user_id is not a number');
  }

  try {
    const res = await fetch(`/api/users/${userId}/detailed`);
    const user: FilterUsersResponseUser = await res.json();

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
  } catch (err) {
    throw error(400, 'failed to fetch user data: ' + err);
  }
};
