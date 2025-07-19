import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);
  if (!id) throw error(400, `id should be a number, got ${id}`);

  try {
    const { data } = await $backendApi.get(`/users/${id}/detailed`);
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
