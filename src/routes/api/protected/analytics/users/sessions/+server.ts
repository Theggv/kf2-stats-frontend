import { $authApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { json } from '@sveltejs/kit';

import type { AxiosRequestConfig } from 'axios';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const config: AxiosRequestConfig = {
      headers: { Authorization: request.headers.get('Authorization') || '' },
    };

    const { data } = await $authApi.post(
      `/analytics/users/sessions`,
      body,
      config
    );

    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
