import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const { data } = await $backendApi.post(`/analytics/server/usage`, body);
    return json(data.items);
  } catch (err) {
    throw handleApiError(err);
  }
};
