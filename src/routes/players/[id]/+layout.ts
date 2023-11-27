import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { UsersApiService } from '$lib/api/users';
import { SITE_NAME } from '$lib';

export let ssr = false;

export const load: LayoutLoad = async ({ params }) => {
  const userId = Number(params.id);
  if (isNaN(userId)) {
    throw error(400, 'user_id is not a number');
  }

  try {
    const { data: user } = await UsersApiService.getUserDetailed(userId);

    return {
      user,
      metadata: {
        title: `${user.name}'s Profile | ${SITE_NAME}`,
        description: `${user.name}'s user page`,
        openGraph: {
          title: `${user.name}'s Profile | ${SITE_NAME}`,
          description: `${user.name}'s user page`,
          type: 'profile',
          images: [{ url: user.avatar, width: 32, height: 32, alt: '' }],
          profile: {
            username: user.name,
          },
        },
      },
    };
  } catch (err) {
    throw error(400, 'failed to fetch user data');
  }
};
