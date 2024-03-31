import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigurationState } from './configuration.state';

export const getConfigurationState =
  createFeatureSelector<ConfigurationState>('configuration');

export const getBaseEndpoint = createSelector(getConfigurationState, (state) =>
  state && state.api ? state.api.baseUrl : null
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

export const getSignatureUrl = createSelector(getConfigurationState, (state) =>
  state && state.images ? state.images.signature : null
);

export const getWeatherForcastEndpoints = createSelector(
  getConfigurationState,
  (state) => (state && state.api ? state.api.endpoints.weatherForcast : null)
);
