import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { UsersApiService } from '$lib/api/users';

export let ssr = false;

export const load: LayoutLoad = async ({ params }) => {
  const userId = Number(params.id);
  if (isNaN(userId)) {
    throw error(400, 'user_id is not a number');
  }

  try {
    const { data: user } = await UsersApiService.getUserDetailed(userId);
    return { user };
  } catch (err) {
    throw error(400, 'failed to fetch user data');
  }
};
