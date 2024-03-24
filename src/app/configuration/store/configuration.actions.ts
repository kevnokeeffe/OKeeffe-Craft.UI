import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ConfigurationSettingsModel } from '../models/configuration.settings.model';

export const ConfigurationActions = createActionGroup({
  source: 'Configuration settings',
  events: {
    loadConfigurationSettings: emptyProps(),
    loadConfigurationSettingsSuccess: props<{
      payload: ConfigurationSettingsModel;
    }>(),
    loadConfigurationSettingsFailed: props<{ error: string }>(),
  },
});
