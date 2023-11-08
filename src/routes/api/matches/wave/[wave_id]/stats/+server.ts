import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { GetMatchWaveStatsResponse } from '$lib/api/matches';

export const GET: RequestHandler = async ({ params }) => {
  const wave_id = parseInt(params.wave_id);

  if (!wave_id) throw error(400, `wave_id should be a number, got ${wave_id}`);

  try {
    const { data } = await $backendApi.get<GetMatchWaveStatsResponse>(
      `/matches/wave/${wave_id}/stats`
    );
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
