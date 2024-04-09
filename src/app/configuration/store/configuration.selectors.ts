import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigurationState } from './configuration.state';

export const getConfigurationState =
  createFeatureSelector<ConfigurationState>('configuration');

export const getBaseEndpoint = createSelector(getConfigurationState, (state) =>
  state && state.api ? state.api.baseUrl : null
);

export const getApiVersion = createSelector(getConfigurationState, (state) =>
  state && state.api ? state.api.version : null
);

export const getEnvironment = createSelector(getConfigurationState, (state) =>
  state && state.environment ? state.environment : null
);

export const getApiEndpoints = createSelector(getConfigurationState, (state) =>
  state && state.api ? state.api.endpoints : null
);

export const getEmailsEndpoints = createSelector(
  getConfigurationState,
  (state) => (state && state.api ? state.api.endpoints.emails : null)
);

export const getConfigurationLoaded = createSelector(
  getConfigurationState,
  (state) =>
    state && state.configurationLoaded ? state.configurationLoaded : false
);

export const getAuthenticationEndpoints = createSelector(
  getConfigurationState,
  (state) => (state && state.api ? state.api.endpoints.authentication : null)
);

export const getAccountsEndpoints = createSelector(
  getConfigurationState,
  (state) => (state && state.api ? state.api.endpoints.accounts : null)
);

export const getSignatureUrl = createSelector(getConfigurationState, (state) =>
  state && state.images ? state.images.signature : null
);

export const getWeatherForcastEndpoints = createSelector(
  getConfigurationState,
  (state) => (state && state.api ? state.api.endpoints.weatherForcast : null)
);

export const getLogsEndpoints = createSelector(getConfigurationState, (state) =>
  state && state.api ? state.api.endpoints.logs : null
);

export const getEmailEndpoints = createSelector(
  getConfigurationState,
  (state) => (state && state.api ? state.api.endpoints.emails : null)
);

export const getContactMessagesEndpoints = createSelector(
  getConfigurationState,
  (state) => (state && state.api ? state.api.endpoints.contactMessages : null)
);
