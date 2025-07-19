import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { GetMatchWavesResponse } from '$lib/api/matches';

export const GET: RequestHandler = async ({ params }) => {
  const match_id = parseInt(params.match_id);

  if (!match_id)
    throw error(400, `match_id should be a number, got ${match_id}`);

  try {
    const { data } = await $backendApi.get<GetMatchWavesResponse>(
      `/matches/${match_id}/waves`
    );
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
