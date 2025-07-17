import { $authApi } from '$lib/http';
import { isAxiosError, type AxiosRequestConfig } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const config: AxiosRequestConfig = {
      headers: { Authorization: request.headers.get('Authorization') || '' },
    };

    const { data } = await $authApi.post(
      `/analytics/users/lastseen`,
      body,
      config
    );

    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(err.status || 400, err.message);
    throw error(404, `${err}`);
  }
};
