import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { AxiosRequestConfig } from 'axios';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const config: AxiosRequestConfig = {
      headers: { Authorization: request.headers.get('Authorization') || '' },
    };

    const { data } = await $backendApi.post(
      `/analytics/users/teammates`,
      body,
      config
    );
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
