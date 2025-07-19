import { $backendApi } from '$lib/http';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { RecentUsersResponse } from '$lib/api/servers';
import { handleApiError } from '$lib/util';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const { data } = await $backendApi.post<RecentUsersResponse>(
      `/servers/users/recent`,
      body
    );
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
