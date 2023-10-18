import { ServersApiService } from '$lib/api/servers';
import { transformAxiosResponse } from '$lib/util/streaming';

import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import { delay } from '$lib/util';

export const load: PageServerLoad = async ({ params }) => {
  const serverId = Number(params.slug);
  if (isNaN(serverId)) {
    throw error(400, 'server_id should be a number');
  }

  return {
    serverId,
    streamed: {
      server: getServerInfo(serverId),
    },
  };
};

function getServerInfo(id: number) {
  return transformAxiosResponse(
    delay(1000).then(() => ServersApiService.getById(id))
  );
}
