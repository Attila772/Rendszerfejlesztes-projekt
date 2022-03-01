import { AUTH_TOKEN_KEY } from "../config/constants";

export function tokenExists(): boolean {
  return (
    sessionStorage.getItem(AUTH_TOKEN_KEY) !== null ||
    localStorage.getItem(AUTH_TOKEN_KEY) !== null
  );
}

export function saveToken(token: string, rememberMe?: boolean) {
  if (rememberMe) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    sessionStorage.setItem(AUTH_TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  return (
    localStorage.getItem(AUTH_TOKEN_KEY) ||
    sessionStorage.getItem(AUTH_TOKEN_KEY)
  );
}

export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
}
