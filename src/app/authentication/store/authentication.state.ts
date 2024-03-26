export interface AuthenticationState {
  isAuthenticated: boolean;
  authenticationSuccess: boolean;
  error: any | null;
  authenticationMessage: string | null;
  authenticationData: any | null;
}

export const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
  authenticationSuccess: false,
  authenticationMessage: null,
  error: null,
  authenticationData: null,
};
