import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const match_id = parseInt(params.match_id);

  if (!match_id)
    throw error(400, `match_id should be a number, got ${match_id}`);

  try {
    const { data } = await $backendApi.get(`/matches/${match_id}/live`);
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
