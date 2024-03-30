import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AccountResponseModel } from '../../accounts/models/account-response.model';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AuthenticateResponseModel } from '../models/authenticate-response.model';
import { AuthenticateRequestModel } from '../models/authentication-request.model';
import { RegisterRequestModel } from '../models/register-request.model';

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
    logout: props<{ authenticated: boolean }>(),
    refreshToken: emptyProps(),
    refreshTokenSuccess: emptyProps(),
    refreshTokenFailed: props<{ error: any }>(),
    isAuthenticated: props<{ authenticated: boolean }>(),
    weatherForcast: emptyProps(),
    weatherForcastSuccess: props<{
      payload: ServiceResponseModel<string>;
    }>(),
    weatherForcastFailed: props<{ error: any }>(),
  },
});
