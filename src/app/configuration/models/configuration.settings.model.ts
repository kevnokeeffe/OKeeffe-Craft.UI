export interface ConfigurationSettingsModel {
  environment: string | null;
  settingsLoaded: boolean;
  api: ApiModel | null;
  images: ImagesModel | null;
}

export interface ApiModel {
  baseUrl: string;
  version: string;
  endpoints: ApiEndpointModel;
}

export interface ApiEndpointModel {}

export interface ImagesModel {
  signature: string;
}
