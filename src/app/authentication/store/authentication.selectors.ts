import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const getAuthenticationState =
  createFeatureSelector<AuthenticationState>('authentication');

export const getAuthenticationSuccess = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.authenticationSuccess ? state.authenticationSuccess : false
);

export const getIsAuthenticated = createSelector(
  getAuthenticationState,
  (state) => (state && state.isAuthenticated ? state.isAuthenticated : false)
);
