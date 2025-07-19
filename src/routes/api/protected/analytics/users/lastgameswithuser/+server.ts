import { $authApi } from '$lib/http';
import { type AxiosRequestConfig } from 'axios';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { handleApiError } from '$lib/util';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const config: AxiosRequestConfig = {
      headers: { Authorization: request.headers.get('Authorization') || '' },
    };

    const { data } = await $authApi.post(
      `/analytics/users/lastgameswithuser`,
      body,
      config
    );

    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
