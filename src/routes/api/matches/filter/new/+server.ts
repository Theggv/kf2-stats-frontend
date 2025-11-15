import { $backendApi } from '$lib/http';

import { json } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { FilterMatchesResponse } from '$lib/api/matches';
import { handleApiError } from '$lib/util';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();

  try {
    const { data } = await $backendApi.post<FilterMatchesResponse>(
      `/matches/filter/new`,
      body
    );
    return json(data);
  } catch (err) {
    throw handleApiError(err);
  }
};
