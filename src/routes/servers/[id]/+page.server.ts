import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { ServerData } from '$lib/api/servers';
import { SITE_NAME } from '$lib';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const serverId = Number(params.id);
  if (isNaN(serverId)) {
    throw error(400, 'server_id is not a number');
  }

  try {
    const server: ServerData = await fetch(`/api/servers/${serverId}`).then(
      (x) => x.json()
    );

    return {
      server,
      metatags: {
        title: `${server.name} | Servers | ${SITE_NAME}`,
        openGraph: {
          title: `${server.name} | Servers | ${SITE_NAME}`,
        },
      },
    };
  } catch (err) {
    throw error(404, { message: 'Server is Not Found' });
  }
};
