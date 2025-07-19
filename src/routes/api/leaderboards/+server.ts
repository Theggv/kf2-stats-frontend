import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const { data } = await $backendApi.post(`/leaderboards/`, body);
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
