import { $backendApi } from '$lib/http';
import { isAxiosError } from 'axios';

import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { RecentSessionsRequest } from '$lib/api/users';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const { data } = await $backendApi.post<RecentSessionsRequest>(
      `/users/sessions/recent`,
      body
    );
    return json(data);
  } catch (err) {
    if (isAxiosError(err)) throw error(400, err.message);
    throw error(404, `${err}`);
  }
};
