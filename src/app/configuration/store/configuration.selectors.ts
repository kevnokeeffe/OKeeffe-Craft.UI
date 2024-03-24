import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigurationState } from './configuration.state';

export const getConfigurationState =
  createFeatureSelector<ConfigurationState>('configuration');

export const getBaseEndpoint = createSelector(getConfigurationState, (state) =>
  state && state.api ? state.api.baseUrl : null
);

export const getSignatureUrl = createSelector(getConfigurationState, (state) =>
  state && state.images ? state.images.signature : null
);
