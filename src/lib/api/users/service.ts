import { $api } from '$lib/http';

import type {
  CreateUserRequest,
  CreateUserResponse,
  FilterUsersRequest,
  FilterUsersResponse,
} from './dto';

export class UsersApiService {
  static add(body: CreateUserRequest) {
    return $api.post<CreateUserResponse>(`/users/`, body);
  }

  static filter(body: FilterUsersRequest) {
    return $api.post<FilterUsersResponse>(`/users/filter`, body);
  }
}
