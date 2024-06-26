import { Store } from '@ngrx/store';
import { ApiClient } from '../../utilities/api-client';
import {
  AuthenticationEndpointsModel,
  WeatherForcastEndpointsModel,
} from '../../configuration/models/configuration.settings.model';
import {
  getAuthenticationEndpoints,
  getWeatherForcastEndpoints,
} from '../../configuration/store/configuration.selectors';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AuthenticateResponseModel } from '../models/authenticate-response.model';
import { BehaviorSubject, Observable, Subject, map, takeUntil } from 'rxjs';
import { AuthUtils } from '../auth-utils';
import { AuthenticationActions } from './authentication.actions';
import { RegisterRequestModel } from '../models/register-request.model';
import { AccountResponseModel } from '../../accounts/models/account-response.model';

export class AuthenticationDataService {
  authenticationEndpoints: AuthenticationEndpointsModel | undefined;
  weatherForcastEndpoints: WeatherForcastEndpointsModel | undefined;
  private userSubject: BehaviorSubject<any | null> | undefined;
  public user: Observable<any | null>;
  public destroy$ = new Subject<void>();
  constructor(protected api: ApiClient, protected store: Store<any>) {
    this.userSubject = new BehaviorSubject<any | null>(null);
    this.user = this.userSubject.asObservable();
    this.store
      .select(getAuthenticationEndpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((endpoints) => {
        if (endpoints) {
          this.authenticationEndpoints = endpoints;
        }
      });
    this.store
      .select(getWeatherForcastEndpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((endpoint) => {
        if (endpoint) {
          this.weatherForcastEndpoints = endpoint;
        }
      });
  }

  authenticate(
    auth: any
  ): Observable<ServiceResponseModel<AuthenticateResponseModel>> {
    return this.api
      .post<ServiceResponseModel<AuthenticateResponseModel>>(
        `${this.authenticationEndpoints?.authenticate}`,
        auth.authenticate
      )
      .pipe(
        map((response) => {
          if (this.userSubject) {
            this.userSubject.next(response.data);
            if (response.data?.refreshToken) {
              AuthUtils.saveRefreshToken(response.data.refreshToken);
            }
            if (response.data) {
              this.startRefreshTokenTimer();
            }
          }
          return response;
        })
      );
  }

  register(model: RegisterRequestModel): Observable<any> {
    const registerEndpoint = this.authenticationEndpoints?.register;
    if (!registerEndpoint) {
      throw new Error('Register endpoint is undefined.');
    }
    return this.api.post<ServiceResponseModel<AccountResponseModel>>(
      registerEndpoint,
      model
    );
  }

  verifyEmail(model: any): Observable<ServiceResponseModel<string>> {
    const verifyEmailEndpoint = this.authenticationEndpoints?.verifyEmail;
    if (!verifyEmailEndpoint) {
      throw new Error('Verify email endpoint is undefined.');
    }
    return this.api.post<ServiceResponseModel<string>>(
      verifyEmailEndpoint,
      model.model
    );
  }

  secureWeatherForcast(): Observable<any> {
    return this.api.get<any>(
      this.weatherForcastEndpoints?.getSecureWeatehrForcast ?? ''
    );
  }

  getWeatherForcast(): Observable<any> {
    return this.api.get<any>(
      this.weatherForcastEndpoints?.getWeatherForcast ?? ''
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = { token: AuthUtils.getRefreshToken() };
    if (!refreshToken.token) {
      return new Observable((observer) => {
        observer.error('No refresh token found.');
      });
    }

    return this.api
      .post<any>(this.authenticationEndpoints?.refreshToken ?? '', refreshToken)
      .pipe(
        map((res) => {
          if (this.userSubject && res && res.success) {
            this.userSubject.next(res.data);
            if (res.data.refreshToken) {
              AuthUtils.saveRefreshToken(res.data.refreshToken);
            }
            if (res.data) {
              this.store.dispatch(
                AuthenticationActions.isAuthenticated({
                  authenticated: res.success,
                })
              );
              this.startRefreshTokenTimer();
            }
          }
          return res;
        })
      );
  }

  resetPassword(model: any): Observable<any> {
    return this.api.post<any>(
      this.authenticationEndpoints?.resetPassword ?? '',
      model.model
    );
  }

  forgotPassword(model: any): Observable<any> {
    return this.api.post<any>(
      this.authenticationEndpoints?.forgotPassword ?? '',
      model.model
    );
  }

  logout(): Observable<any> {
    const token = AuthUtils.getRefreshToken();
    return this.api
      .post<any>(`${this.authenticationEndpoints?.revokeToken}`, { token })
      .pipe(
        map((res) => {
          this.stopRefreshTokenTimer();
          AuthUtils.removeRefreshToken();
          this.store.dispatch(
            AuthenticationActions.isAuthenticated({ authenticated: false })
          );
          if (this.userSubject) {
            this.userSubject.next(null);
          }
          return res;
        })
      );
  }

  public get userValue() {
    return this.userSubject?.value;
  }

  private refreshTokenTimeout?: any;

  private startRefreshTokenTimer() {
    // parse json object from base64 encoded jwt token
    const jwtBase64 = this.userValue!.jwtToken!.split('.')[1];
    const jwtToken = JSON.parse(atob(jwtBase64));
    if (!jwtToken.exp) return;
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken()?.subscribe(() => {
        // Restart the timer after the token is refreshed
        this.startRefreshTokenTimer();
      });
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
