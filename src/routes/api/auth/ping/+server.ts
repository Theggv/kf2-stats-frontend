import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    const { data } = await $backendApi.get('/auth/ping');

    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
