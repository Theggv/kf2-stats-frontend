import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import { $backendApi } from '$lib/http';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    const { data } = await $backendApi.post('/auth/logout', undefined, {
      headers: { cookie: 'refreshToken=' + cookies.get('refreshToken') },
    });

    cookies.delete('refreshToken', { path: '/' });
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
