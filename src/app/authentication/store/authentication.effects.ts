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
          catchError(() =>
            of({
              type: AuthenticationActions.authenticationFailed.type,
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
          map(() => ({
            type: AuthenticationActions.refreshTokenSuccess.type,
          })),
          catchError(() =>
            of({
              type: AuthenticationActions.refreshTokenFailed.type,
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
            authenticated: false,
          }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
}
