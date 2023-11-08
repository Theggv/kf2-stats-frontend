import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { GetByPatternResponse } from '$lib/api/maps';

export const GET: RequestHandler = async ({ url }) => {
  const pattern = url.searchParams.get('pattern');

  try {
    const { data } = await $backendApi.get<GetByPatternResponse>(`/maps/`, {
      params: { pattern },
    });
    return json(data.items);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
