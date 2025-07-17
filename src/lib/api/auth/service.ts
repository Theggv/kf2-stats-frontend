import type { AuthResponse } from './dto';
import { $authProxyApi, $proxyApi } from '$lib/http';

export class AuthApiService {
  static login(params: string) {
    return $proxyApi.post<AuthResponse>(`/auth/login`, { params });
  }

  static refresh() {
    return $proxyApi.post<AuthResponse>(`/auth/refresh`);
  }

  static logout() {
    return $proxyApi.post(`/auth/logout`);
  }

  static test() {
    return $authProxyApi.post<AuthResponse>(`/auth/test`);
  }
}
