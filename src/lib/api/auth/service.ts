import type { AuthResponse } from './dto';
import { $proxyApi } from '$lib/http';

export class AuthApiService {
  static ping() {
    return $proxyApi.get(`/auth/ping`);
  }

  static login(params: string) {
    return $proxyApi.post<AuthResponse>(`/auth/login`, { params });
  }

  static refresh() {
    return $proxyApi.post<AuthResponse>(`/auth/refresh`);
  }

  static logout() {
    return $proxyApi.post(`/auth/logout`);
  }
}
