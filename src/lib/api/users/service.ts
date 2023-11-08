import { $proxyApi } from '$lib/http';

import type { FilterUsersRequest, FilterUsersResponse } from './dto';

export class UsersApiService {
  static filter(body: FilterUsersRequest) {
    return $proxyApi.post<FilterUsersResponse>(`/users/filter`, body);
  }
}
