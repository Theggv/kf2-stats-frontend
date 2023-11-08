import type { ServerData } from './dto';
import { $proxyApi } from '$lib/http';

export class ServersApiService {
  static getByPattern(pattern?: string) {
    return $proxyApi.get<ServerData[]>(`/servers`, {
      params: { pattern },
    });
  }

  static getById(id: number) {
    return $proxyApi.get<ServerData>(`/servers/${id}`);
  }
}
