import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LogsService } from './logs.service';
import { Injectable } from '@angular/core';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { LogsActions } from './logs.actions';

@Injectable()
export class LogsEffects {
  constructor(private actions$: Actions, private logsService: LogsService) {}

  getActivityLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogsActions.getActivityLogs),
      exhaustMap(() =>
        this.logsService.getActivityLogs().pipe(
          map((activityLogs) =>
            LogsActions.getActivityLogsSuccess({ payload: activityLogs })
          ),
          catchError((error) =>
            of(LogsActions.getActivityLogsFailed({ error }))
          )
        )
      )
    )
  );

  getErrorLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogsActions.getErrorLogs),
      exhaustMap(() =>
        this.logsService.getErrorLogs().pipe(
          map((errorLogs) =>
            LogsActions.getErrorLogsSuccess({ payload: errorLogs })
          ),
          catchError((error) => of(LogsActions.getErrorLogsFailed({ error })))
        )
      )
    )
  );

  getActivityLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogsActions.getActivityLog),
      exhaustMap((action) =>
        this.logsService.getActivityLog(action.id).pipe(
          map((activityLog) =>
            LogsActions.getActivityLogSuccess({ payload: activityLog })
          ),
          catchError((error) => of(LogsActions.getActivityLogFailed({ error })))
        )
      )
    )
  );

  getErrorLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LogsActions.getErrorLog),
      exhaustMap((action) =>
        this.logsService.getErrorLog(action.id).pipe(
          map((errorLog) =>
            LogsActions.getErrorLogSuccess({ payload: errorLog })
          ),
          catchError((error) => of(LogsActions.getErrorLogFailed({ error })))
        )
      )
    )
  );
}
