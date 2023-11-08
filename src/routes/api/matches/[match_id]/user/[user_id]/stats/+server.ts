import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { GetMatchPlayerStatsResponse } from '$lib/api/matches';

export const GET: RequestHandler = async ({ params }) => {
  const match_id = parseInt(params.match_id);

  if (!match_id)
    throw error(400, `match_id should be a number, got ${match_id}`);

  const user_id = parseInt(params.user_id);

  if (!user_id) throw error(400, `user_id should be a number, got ${user_id}`);

  try {
    const { data } = await $backendApi.get<GetMatchPlayerStatsResponse>(
      `/matches/${match_id}/user/${user_id}/stats`
    );
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
