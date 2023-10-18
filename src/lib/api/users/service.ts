import { $api } from '$lib/http';

import type { CreateUserRequest, CreateUserResponse } from './dto';

export class UsersApiService {
  static add(body: CreateUserRequest) {
    return $api.post<CreateUserResponse>(`/users/`, body);
  }
}
