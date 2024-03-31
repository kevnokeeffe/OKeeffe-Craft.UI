import { ServiceResponseModel } from '../../models/service-response.model';
import { AuthenticateResponseModel } from '../models/authenticate-response.model';

export interface AuthenticationState {
  isAuthenticated: boolean;
  authenticationResponse: ServiceResponseModel<AuthenticateResponseModel> | null;
  error: any | null;
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
  authenticationResponse: null,
  error: null,
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
