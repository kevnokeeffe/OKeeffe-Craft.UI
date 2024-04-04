import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';
import { UserRoles } from '../models/user-roles.enum';

export const getAuthenticationState =
  createFeatureSelector<AuthenticationState>('authentication');

export const getAuthenticationResponse = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.authenticationResponse ? state.authenticationResponse : null
);

export const getAccountId = createSelector(getAuthenticationState, (state) =>
  state && state.accountId ? state.accountId : null
);

export const getIsAuthenticated = createSelector(
  getAuthenticationState,
  (state) => (state && state.isAuthenticated ? state.isAuthenticated : false)
);

export const getWeatherForecastSuccess = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.weatherForcastSuccess ? state.weatherForcastSuccess : false
);

export const getRegistrationSuccess = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.registrationSuccess ? state.registrationSuccess : false
);

export const getRegistrationData = createSelector(
  getAuthenticationState,
  (state) => (state && state.registrationData ? state.registrationData : null)
);

export const getAuthError = createSelector(getAuthenticationState, (state) =>
  state && state.error ? state.error : null
);

export const getVerifyEmailResponse = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.verifyEmailResponse ? state.verifyEmailResponse : null
);

export const getResetPasswordResponse = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.resetPasswordResponse ? state.resetPasswordResponse : null
);

export const getForgotPasswordResponse = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.forgotPasswordResponse ? state.forgotPasswordResponse : null
);

export const getSecureWeatherForecastResponse = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.secureWeatherForcastResponse
      ? state.secureWeatherForcastResponse
      : null
);

export const getIsAdmin = createSelector(getAuthenticationState, (state) =>
  state && state.authenticationResponse?.data?.role
    ? state.authenticationResponse.data.role === UserRoles.Admin
    : false
);
