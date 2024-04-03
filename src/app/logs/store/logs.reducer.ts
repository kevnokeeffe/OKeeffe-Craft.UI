import { createReducer, on } from '@ngrx/store';
import { LogsActions } from './logs.actions';
import { initialLogsState } from './logs.state';

export const logsReducer = createReducer(
  initialLogsState,
  on(LogsActions.getActivityLog, (state) => state),

  on(LogsActions.getActivityLogSuccess, (state, { payload }) => ({
    ...state,
    activityLog: payload.data,
    activityLogLoaded: true,
  })),
  on(LogsActions.getActivityLogFailed, (state, { error }) => ({
    ...state,
    activityLogLoaded: false,
    error,
  })),
  on(LogsActions.getActivityLogs, (state) => state),
  on(LogsActions.getActivityLogsSuccess, (state, { payload }) => ({
    ...state,
    activityLogs: payload.data,
    activityLogsLoaded: true,
  })),
  on(LogsActions.getActivityLogsFailed, (state, { error }) => ({
    ...state,
    activityLogsLoaded: false,
    error,
  })),
  on(LogsActions.getErrorLog, (state) => state),
  on(LogsActions.getErrorLogSuccess, (state, { payload }) => ({
    ...state,
    errorLog: payload.data,
    errorLogLoaded: true,
  })),
  on(LogsActions.getErrorLogFailed, (state, { error }) => ({
    ...state,
    error,
    errorLogLoaded: false,
  })),
  on(LogsActions.getErrorLogs, (state) => state),
  on(LogsActions.getErrorLogsSuccess, (state, { payload }) => ({
    ...state,
    errorLogs: payload.data,
    errorLogsLoaded: true,
  })),
  on(LogsActions.getErrorLogsFailed, (state, { error }) => ({
    ...state,
    error,
    errorLogsLoaded: false,
  })),
  on(LogsActions.clearErrors, (state) => ({
    ...state,
    error: null,
  })),
  on(LogsActions.clearAll, (state) => initialLogsState)
);
