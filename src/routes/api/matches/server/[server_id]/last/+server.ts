import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { MatchData } from '$lib/api/matches';

export const GET: RequestHandler = async ({ params }) => {
  const server_id = parseInt(params.server_id);

  if (!server_id)
    throw error(400, `server_id should be a number, got ${server_id}`);

  try {
    const { data } = await $backendApi.get<MatchData>(
      `/matches/server/${server_id}/last`
    );
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
