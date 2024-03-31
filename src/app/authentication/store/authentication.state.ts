import { ServiceResponseModel } from '../../models/service-response.model';

export interface AuthenticationState {
  isAuthenticated: boolean;
  authenticationSuccess: boolean;
  error: any | null;
  authenticationMessage: string | null;
  authenticationData: any | null;
  registrationSuccess: boolean;
  registrationMessage: string | null;
  registrationData: any | null;
  weatherForcastSuccess: boolean;
  weatherForcastMessage: string | null;
  weatherForcastData: any | null;
  verifyEmailResponse: ServiceResponseModel<string> | null;
  resetPasswordResponse: ServiceResponseModel<string> | null;
  forgotPasswordResponse: ServiceResponseModel<string> | null;
  secureWeatherForcastResponse: ServiceResponseModel<any> | null;
}

export const initialAuthenticationState: AuthenticationState = {
  isAuthenticated: false,
  authenticationSuccess: false,
  authenticationMessage: null,
  error: null,
  authenticationData: null,
  registrationSuccess: false,
  registrationMessage: null,
  registrationData: null,
  weatherForcastSuccess: false,
  weatherForcastMessage: null,
  weatherForcastData: null,
  verifyEmailResponse: null,
  resetPasswordResponse: null,
  forgotPasswordResponse: null,
  secureWeatherForcastResponse: null,
};
