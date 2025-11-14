import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { AuthApiService } from '$lib/api/auth';
import axios, {
  isAxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

export const $backendApi = axios.create({
  baseURL: PUBLIC_BACKEND_URL,
});

export const $authApi = axios.create({
  withCredentials: true,
  baseURL: PUBLIC_BACKEND_URL,
  timeout: 5 * 60 * 1000,
});

export const $proxyApi = axios.create({
  baseURL: '/api',
});

export const $authProxyApi = axios.create({
  baseURL: '/api/protected',
});

export const addAuthHeader = (config: AxiosRequestConfig, token: string) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  } as any;
};

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');

  if (token) addAuthHeader(config, token);

  return config;
};

export const authOnErrorInterceptor = async (error: any) => {
  if (!isAxiosError(error)) throw error;

  const originalRequest = error.config;

  if (
    error.response &&
    error.response.status === 401 &&
    originalRequest &&
    !(originalRequest as any)._isRetry
  ) {
    try {
      const { data } = await AuthApiService.refresh();

      localStorage.setItem('accessToken', data.access_token);
      addAuthHeader(originalRequest, data.access_token);
    } catch (error) {
      localStorage.setItem('invalidate-token', '1');
      throw error;
    }

    return $authProxyApi.request(originalRequest);
  }

  throw error;
};

$authProxyApi.interceptors.request.use(authRequestInterceptor);

$authProxyApi.interceptors.response.use(
  (config) => config,
  authOnErrorInterceptor
);
