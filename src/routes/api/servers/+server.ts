import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const pattern = url.searchParams.get('pattern');

  try {
    const { data } = await $backendApi.get(`/servers/`, {
      params: { pattern },
    });
    return json(data.items);
  } catch (err) {
    throw handleApiError(err);
  }
};
