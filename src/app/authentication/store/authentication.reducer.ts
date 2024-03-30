import { createReducer, on } from '@ngrx/store';
import { initialAuthenticationState } from './authentication.state';
import { AuthenticationActions } from './authentication.actions';

export const authenticationReducer = createReducer(
  initialAuthenticationState,
  on(AuthenticationActions.authenticate, (state) => state),
  on(AuthenticationActions.authenticateSuccess, (state, { payload }) => {
    return {
      ...state,
      authenticationSuccess: payload.success,
      isAuthenticated: payload.success,
      authenticationMessage: payload.message,
      authenticationData: payload.data,
    };
  }),
  on(AuthenticationActions.authenticationFailed, (state, { error }) => ({
    ...state,
    authenticationSuccessful: false,
    error,
  })),
  on(AuthenticationActions.register, (state) => state),
  on(AuthenticationActions.registerSuccess, (state, { payload }) => {
    return {
      ...state,
      registrationSuccess: payload.success,
      registrationMessage: payload.message,
      registrationData: payload.data,
    };
  }),
  on(AuthenticationActions.registerFailed, (state, { error }) => ({
    ...state,
    registrationSuccessful: false,
    error,
  })),
  on(AuthenticationActions.logout, (state, { authenticated }) => ({
    ...state,
    isAuthenticated: authenticated,
  })),
  on(AuthenticationActions.refreshToken, (state) => state),
  on(AuthenticationActions.refreshTokenSuccess, (state) => state),
  on(AuthenticationActions.refreshTokenFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AuthenticationActions.isAuthenticated, (state, { authenticated }) => ({
    ...state,
    isAuthenticated: authenticated,
  })),
  on(AuthenticationActions.weatherForcast, (state) => state),
  on(AuthenticationActions.weatherForcastSuccess, (state, { payload }) => {
    return {
      ...state,
      weatherForcastSuccess: payload.success,
      weatherForcastMessage: payload.message,
      weatherForcastData: payload.data,
    };
  }),
  on(AuthenticationActions.weatherForcastFailed, (state, { error }) => ({
    ...state,
    weatherForcastSuccess: false,
    error,
  })),
  on(AuthenticationActions.verifyEmail, (state) => state),
  on(AuthenticationActions.verifyEmailSuccess, (state, { payload }) => {
    return {
      ...state,
      verifyEmailResponse: payload,
    };
  }),
  on(AuthenticationActions.verifyEmailFailed, (state, { error }) => ({
    ...state,
    verifyEmailResponse: null,
    error,
  })),
  on(AuthenticationActions.resetPassword, (state) => state),
  on(AuthenticationActions.resetPasswordSuccess, (state, { payload }) => {
    return {
      ...state,
      resetPasswordResponse: payload,
    };
  }),
  on(AuthenticationActions.resetPasswordFailed, (state, { error }) => ({
    ...state,
    resetPasswordResponse: null,
    error,
  })),
  on(AuthenticationActions.forgotPassword, (state) => state),
  on(AuthenticationActions.forgotPasswordSuccess, (state, { payload }) => {
    return {
      ...state,
      forgotPasswordResponse: payload,
    };
  }),
  on(AuthenticationActions.forgotPasswordFailed, (state, { error }) => ({
    ...state,
    forgotPasswordResponse: null,
    error,
  })),
  on(AuthenticationActions.clearErrors, (state) => ({
    ...state,
    error: null,
  }))
);
