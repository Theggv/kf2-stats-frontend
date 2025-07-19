import { $backendApi } from '$lib/http';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { handleApiError } from '$lib/util';

export const GET: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);

  if (!id) throw error(400, `id should be a number, got ${id}`);

  try {
    const { data } = await $backendApi.get(`/servers/${id}`);
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
