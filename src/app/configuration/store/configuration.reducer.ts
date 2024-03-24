import { createReducer, on } from '@ngrx/store';
import { ConfigurationActions } from './configuration.actions';
import { initialConfigurationState } from './configuration.state';

export const configurationReducer = createReducer(
  initialConfigurationState,
  on(ConfigurationActions.loadConfigurationSettings, (state) => state),
  on(
    ConfigurationActions.loadConfigurationSettingsSuccess,
    (state, { payload }) => ({ ...state, ...payload })
  ),
  on(
    ConfigurationActions.loadConfigurationSettingsFailed,
    (state, { error }) => ({ ...state, error })
  )
);
