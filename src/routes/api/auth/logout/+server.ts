import { $backendApi } from '$lib/http';
import { handleApiError } from '$lib/util';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const { data } = await $backendApi.post('/auth/logout', undefined, {
      headers: { cookie: 'refreshToken=' + cookies.get('refreshToken') },
    });

    cookies.delete('refreshToken', { path: '/' });
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
