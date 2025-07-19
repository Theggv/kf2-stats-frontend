import { error } from '@sveltejs/kit';
import { isAxiosError } from 'axios';

export function handleApiError(err: unknown) {
  if (isAxiosError(err)) {
    if (err.code === 'ECONNREFUSED') {
      return error(503, 'backend is unavailable');
    }
    return error(err.status || 400, err.message);
  }

  return error(404, `${err}`);
}
