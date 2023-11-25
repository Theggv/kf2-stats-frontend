import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export let ssr = false;

export const load: PageLoad = async ({ params, url }) => {
  const userId = Number(params.id);
  if (isNaN(userId)) {
    throw error(400, 'user_id is not a number');
  }

  return { userId, date: url.searchParams.get('date') };
};
