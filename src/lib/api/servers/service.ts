import { $proxyApi } from '$lib/http';
import type {
  ServerData,
  RecentUsersRequest,
  RecentUsersResponse,
} from './dto';

export class ServersApiService {
  static getByPattern(pattern?: string) {
    return $proxyApi.get<ServerData[]>(`/servers`, {
      params: { pattern },
    });
  }

  static getById(id: number) {
    return $proxyApi.get<ServerData>(`/servers/${id}`);
  }

  static getRecentUsers(body: RecentUsersRequest) {
    return $proxyApi.post<RecentUsersResponse>('/servers/users/recent', body);
  }
}
