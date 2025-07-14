import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const { data } = await $backendApi.post(`/analytics/users/maps`, body);
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
