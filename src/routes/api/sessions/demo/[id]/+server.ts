import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { DemoRecordAnalysis } from '$lib/api/sessions/demo';

export const GET: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);

  if (!id) throw error(400, `id should be a number, got ${id}`);

  try {
    const { data } = await $backendApi.get<DemoRecordAnalysis>(
      `/sessions/demo/${id}`
    );
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
