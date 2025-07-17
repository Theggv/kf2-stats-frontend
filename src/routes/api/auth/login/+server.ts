import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';
import cookieParser from 'set-cookie-parser';

import type { RequestHandler } from './$types';
import { $backendApi } from '$lib/http';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();

  try {
    const { data, headers } = await $backendApi.post('/auth/login', body);

    const cookie = headers['set-cookie'];
    if (!cookie) throw error(401);

    const { name, value, ...opts } = cookieParser.parseString(cookie[0]);
    cookies.set(name, value, { ...opts, sameSite: opts.sameSite as any });
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
