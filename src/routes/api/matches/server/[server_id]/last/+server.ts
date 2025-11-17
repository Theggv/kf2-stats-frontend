import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const server_id = parseInt(params.server_id);

  if (!server_id)
    throw error(400, `server_id should be a number, got ${server_id}`);

  try {
    const { data } = await $backendApi.get(`/matches/server/${server_id}`);
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
