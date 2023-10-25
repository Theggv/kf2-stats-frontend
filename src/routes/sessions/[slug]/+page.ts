import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const sessionId = Number(params.slug);
  if (isNaN(sessionId)) {
    throw error(400, 'session_id should be a number');
  }

  return { sessionId };
};

export const ssr = false;
