import { AuthApiService, type TokenPayload } from '$lib/api/auth';
import { writable } from 'svelte/store';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

export function getAuth() {
  const isLogin = writable<boolean>(false);
  const token = writable<string | null>(localStorage.getItem('accessToken'));
  const user = writable<TokenPayload | null>(null);

  async function login(params: URLSearchParams) {
    try {
      const { data } = await AuthApiService.login(params.toString());

      token.set(data.access_token);
    } catch (error) {}
  }

  async function refresh() {
    try {
      const { data } = await AuthApiService.refresh();

      token.set(data.access_token);
    } catch {
      isLogin.set(false);
      user.set(null);
    }
  }

  async function logout() {
    try {
      await AuthApiService.logout();
      token.set(null);
    } catch {}
  }

  async function validateToken(token: string | null) {
    if (!token) {
      isLogin.set(false);
      user.set(null);
      return;
    }

    const data = jwtDecode<JwtPayload & { payload: TokenPayload }>(token);

    const now = new Date().getTime() / 1000;

    if (!data || !data.payload) {
      isLogin.set(false);
      user.set(null);

      return;
    }

    if ((data.iat && now < data.iat) || (data.exp && now > data.exp)) {
      refresh();
      return;
    }

    isLogin.set(true);
    user.set(data.payload);
  }

  async function onTokenChanged(token: string | null) {
    validateToken(token);

    if (token) localStorage.setItem('accessToken', token);
    else localStorage.removeItem('accessToken');
  }

  setInterval(() => {
    const invalidate = localStorage.getItem('invalidate-token');

    if (invalidate) {
      onTokenChanged(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('invalidate-token');
    } else {
      token.set(localStorage.getItem('accessToken'));
    }
  }, 500);

  token.subscribe((x) => {
    onTokenChanged(x);
  });

  return { isLogin, user, token, login, logout };
}

export const AuthContextName = 'auth';
export type AuthContextType = ReturnType<typeof getAuth>;
