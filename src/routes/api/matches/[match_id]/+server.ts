import { $backendApi } from '$lib/http';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { MatchData } from '$lib/api/matches';
import { handleApiError } from '$lib/util';

export const GET: RequestHandler = async ({ params }) => {
  const match_id = parseInt(params.match_id);

  if (!match_id)
    throw error(400, `match_id should be a number, got ${match_id}`);

  try {
    const { data } = await $backendApi.get<MatchData>(`/matches/${match_id}`);
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
