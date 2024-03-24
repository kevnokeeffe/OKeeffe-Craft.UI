import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { ConfigurationService } from './configuration.service';
import { ConfigurationActions } from './configuration.actions';

@Injectable()
export class ConfigurationEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationActions.loadConfigurationSettings),
      exhaustMap(() =>
        this.configurationService.load().pipe(
          map((configurationSettings) => ({
            type: ConfigurationActions.loadConfigurationSettingsSuccess.type, // Fix: Use the 'type' property of the action
            payload: configurationSettings,
          })),
          catchError(() =>
            of({
              type: ConfigurationActions.loadConfigurationSettingsFailed.type,
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private configurationService: ConfigurationService
  ) {}
}
