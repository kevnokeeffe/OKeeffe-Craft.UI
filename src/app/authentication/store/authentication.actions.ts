import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccountResponseModel } from '../../accounts/models/account-response.model';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AuthenticateResponseModel } from '../models/authenticate-response.model';
import { AuthenticateRequestModel } from '../models/authentication-request.model';
import { RegisterRequestModel } from '../models/register-request.model';
import { VerifyEmailModel } from '../models/verify-email.model';
import { ResetPasswordRequestModel } from '../models/reset-password-request.model';
import { ForgotPasswordModel } from '../models/forgot-password.model';

export const AuthenticationActions = createActionGroup({
  source: 'Authentication',
  events: {
    authenticate: props<{ authenticate: AuthenticateRequestModel }>(),
    authenticateSuccess: props<{
      payload: ServiceResponseModel<AuthenticateResponseModel>;
    }>(),
    authenticationFailed: props<{ error: any }>(),
    register: props<{ model: RegisterRequestModel }>(),
    registerSuccess: props<{
      payload: ServiceResponseModel<AccountResponseModel>;
    }>(),
    registerFailed: props<{ error: any }>(),
    logout: emptyProps(),
    refreshToken: emptyProps(),
    refreshTokenSuccess: props<{
      payload: ServiceResponseModel<AuthenticateResponseModel>;
    }>(),
    refreshTokenFailed: props<{ error: any }>(),
    verifyEmail: props<{ model: VerifyEmailModel }>(),
    verifyEmailSuccess: props<{ payload: ServiceResponseModel<string> }>(),
    verifyEmailFailed: props<{ error: any }>(),
    resetPassword: props<{ model: ResetPasswordRequestModel }>(),
    resetPasswordSuccess: props<{ payload: ServiceResponseModel<string> }>(),
    resetPasswordFailed: props<{ error: any }>(),
    forgotPassword: props<{ model: ForgotPasswordModel }>(),
    forgotPasswordSuccess: props<{ payload: ServiceResponseModel<string> }>(),
    forgotPasswordFailed: props<{ error: any }>(),
    isAuthenticated: props<{ authenticated: boolean }>(),
    weatherForcast: emptyProps(),
    weatherForcastSuccess: props<{
      payload: ServiceResponseModel<string>;
    }>(),
    weatherForcastFailed: props<{ error: any }>(),
    secureWeatherForcast: emptyProps(),
    secureWeatherForcastSuccess: props<{
      payload: ServiceResponseModel<any>;
    }>(),
    secureWeatherForcastFailed: props<{ error: any }>(),
    clearErrors: emptyProps(),
    clearAll: emptyProps(),
    updateAuthenticationResponse: props<{
      account: AccountResponseModel;
    }>(),
    clearAuthResponse: emptyProps(),
    clearRegResponse: emptyProps(),
    clearForgotPasswordResponse: emptyProps(),  
  },
});
