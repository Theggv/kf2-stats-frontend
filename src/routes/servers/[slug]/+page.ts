import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const serverId = Number(params.slug);
  if (isNaN(serverId)) {
    throw error(400, 'server_id should be a number');
  }

  return {
    serverId,
  };
};
