import { $proxyApi } from '$lib/http';

import type { SessionData } from './dto';

export class SessionsApiService {
  static getById(id: number) {
    return $proxyApi.get<SessionData>(`/sessions/${id}`);
  }
}
