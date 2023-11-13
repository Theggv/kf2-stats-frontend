import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { ServersApiService } from '$lib/api/servers';

export let ssr = false;

export const load: PageLoad = async ({ params }) => {
  const serverId = Number(params.slug);
  if (isNaN(serverId)) {
    throw error(400, 'server_id is not a number');
  }

  try {
    const { data } = await ServersApiService.getById(serverId);
    return data;
  } catch (err) {
    throw error(404, { message: 'Server is Not Found' });
  }
};
