import { $proxyApi } from '$lib/http';

import type {
  FilterUsersRequest,
  FilterUsersResponse,
  FilterUsersResponseUser,
  RecentSessionsRequest,
  RecentSessionsResponse,
} from './dto';

export class UsersApiService {
  static filter(body: FilterUsersRequest) {
    return $proxyApi.post<FilterUsersResponse>(`/users/filter`, body);
  }

  static getUserDetailed(id: number) {
    return $proxyApi.get<FilterUsersResponseUser>(`/users/${id}/detailed`);
  }

  static getRecentSessions(body: RecentSessionsRequest) {
    return $proxyApi.post<RecentSessionsResponse>(`/users/sessions`, body);
  }
}
