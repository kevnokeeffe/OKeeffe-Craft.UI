import { AccountResponseModel } from '../../accounts/models/account-response.model';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AuthenticateResponseModel } from '../models/authenticate-response.model';

export interface AuthenticationState {
  accountId: string | null;
  isAuthenticated: boolean;
  authenticationResponse: ServiceResponseModel<AuthenticateResponseModel> | null;
  error: any | null;
  registrationResponse: ServiceResponseModel<AccountResponseModel> | null;
  weatherForcastSuccess: boolean;
  weatherForcastMessage: string | null;
  weatherForcastData: any | null;
  verifyEmailResponse: ServiceResponseModel<string> | null;
  resetPasswordResponse: ServiceResponseModel<string> | null;
  forgotPasswordResponse: ServiceResponseModel<string> | null;
  secureWeatherForcastResponse: ServiceResponseModel<any> | null;
}

export const initialAuthenticationState: AuthenticationState = {
  accountId: null,
  isAuthenticated: false,
  authenticationResponse: null,
  error: null,
  registrationResponse: null,
  weatherForcastSuccess: false,
  weatherForcastMessage: null,
  weatherForcastData: null,
  verifyEmailResponse: null,
  resetPasswordResponse: null,
  forgotPasswordResponse: null,
  secureWeatherForcastResponse: null,
};
