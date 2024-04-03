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
  accounts: AccountsEndpointsModel;
  logs: LogsEndpointsModel;
  weatherForcast: WeatherForcastEndpointsModel;
}

export interface ImagesModel {
  signature: string;
}

export interface LogsEndpointsModel {
  getActivityLogs: string;
  getActivityLog: string;
  getErrorLogs: string;
  getErrorLog: string;
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

export interface AccountsEndpointsModel {
  getAccounts: string;
  getAccount: string;
  createAccount: string;
  updateAccount: string;
  deleteAccount: string;
}

export interface WeatherForcastEndpointsModel {
  getWeatherForcast: string;
  getSecureWeatehrForcast: string;
}
