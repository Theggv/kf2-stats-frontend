import { PUBLIC_BACKEND_URL } from '$env/static/public';
import axios from 'axios';

export const $api = axios.create({
  baseURL: PUBLIC_BACKEND_URL,
});
