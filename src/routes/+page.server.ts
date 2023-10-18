import { ServersApiService } from '$lib/api/servers';
import { delay } from '$lib/util';
import { transformAxiosResponse } from '$lib/util/streaming';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    streamed: {
      servers: getData(),
    },
  };
};

function getData() {
  return transformAxiosResponse(
    delay(1000).then(() => ServersApiService.getByPattern())
  );
}
