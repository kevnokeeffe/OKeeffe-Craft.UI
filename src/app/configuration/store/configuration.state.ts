import { HttpErrorResponse } from '@angular/common/http';
import { ConfigurationSettingsModel } from '../models/configuration.settings.model';

export interface ConfigurationState extends ConfigurationSettingsModel {
  configurationLoaded: boolean;
  error: HttpErrorResponse | string | null;
}

export const initialConfigurationState: ConfigurationState = {
  configurationLoaded: false,
  environment: null,
  error: null,
  api: null,
  images: null,
};
