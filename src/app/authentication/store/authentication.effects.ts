import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { AuthenticationActions } from './authentication.actions';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationEffects {
  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.authenticate.type),
      exhaustMap((auth) =>
        this.authenticationService.authenticate(auth).pipe(
          map((response) => ({
            type: AuthenticationActions.authenticateSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.authenticationFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.register.type),
      exhaustMap((model) =>
        this.authenticationService.register(model).pipe(
          map((response) => ({
            type: AuthenticationActions.registerSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.registerFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  veriftyEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.verifyEmail.type),
      exhaustMap((model) =>
        this.authenticationService.verifyEmail(model).pipe(
          map((response) => ({
            type: AuthenticationActions.verifyEmailSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.verifyEmailFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.refreshToken.type),
      exhaustMap(() =>
        this.authenticationService.refreshToken().pipe(
          map((response) => ({
            type: AuthenticationActions.refreshTokenSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.refreshTokenFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.resetPassword.type),
      exhaustMap((model) =>
        this.authenticationService.resetPassword(model).pipe(
          map((response) => ({
            type: AuthenticationActions.resetPasswordSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.resetPasswordFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  secureWeatherForcast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.secureWeatherForcast.type),
      exhaustMap(() =>
        this.authenticationService.secureWeatherForcast().pipe(
          map((response) => ({
            type: AuthenticationActions.secureWeatherForcastSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.secureWeatherForcastFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.forgotPassword.type),
      exhaustMap((model) =>
        this.authenticationService.forgotPassword(model).pipe(
          map((response) => ({
            type: AuthenticationActions.forgotPasswordSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.forgotPasswordFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.logout.type),
      exhaustMap(() =>
        this.authenticationService.logout().pipe(
          map(() => ({
            type: AuthenticationActions.logout.type,
          }))
        )
      )
    )
  );

  weatherForcast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.weatherForcast.type),
      exhaustMap(() =>
        this.authenticationService.getWeatherForcast().pipe(
          map((response) => ({
            type: AuthenticationActions.weatherForcastSuccess.type,
            payload: response,
          })),
          catchError((error) =>
            of({
              type: AuthenticationActions.weatherForcastFailed.type,
              error,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
}
