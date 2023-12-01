import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);

  if (!id) throw error(400, `id should be a number, got ${id}`);

  try {
    const { data } = await $backendApi.get(`/servers/${id}/last-session`);
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
