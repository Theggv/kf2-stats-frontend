import { PUBLIC_BACKEND_URL } from '$env/static/public';
import axios from 'axios';

export const $backendApi = axios.create({
  baseURL: PUBLIC_BACKEND_URL,
});

export const $proxyApi = axios.create({
  baseURL: '/api',
});
