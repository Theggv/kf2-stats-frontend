import { error } from '@sveltejs/kit';

import type { LayoutServerLoad } from './$types';
import type { ServerData } from '$lib/api/servers';
import { SITE_NAME } from '$lib';

export const load: LayoutServerLoad = async ({ params, fetch }) => {
  const serverId = Number(params.id);
  if (isNaN(serverId)) {
    throw error(400, 'server_id is not a number');
  }

  const server: ServerData = await fetch(`/api/servers/${serverId}`).then(
    (x) => {
      if (!x.ok) throw error(x.status, { message: 'server was not found' });
      return x.json();
    }
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
};
