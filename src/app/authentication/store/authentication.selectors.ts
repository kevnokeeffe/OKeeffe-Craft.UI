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

export const getAuthenticationData = createSelector(
  getAuthenticationState,
  (state) =>
    state && state.authenticationData ? state.authenticationData : null
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
