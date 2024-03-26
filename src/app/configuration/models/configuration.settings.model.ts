export interface ConfigurationSettingsModel {
  environment: string | null;
  api: ApiModel | null;
  images: ImagesModel | null;
}

export interface ApiModel {
  baseUrl: string;
  version: string;
  endpoints: ApiEndpointModel;
}

export interface ApiEndpointModel {
  authentication: AuthenticationEndpointsModel;
}

export interface ImagesModel {
  signature: string;
}

export interface AuthenticationEndpointsModel {
  authenticate: string;
  register: string;
  forgotPassword: string;
  resetPassword: string;
  verifyEmail: string;
  resendVerificationEmail: string;
  refreshToken: string;
  revokeToken: string;
}
