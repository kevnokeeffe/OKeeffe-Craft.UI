import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogsState } from './logs.state';

export const getLogsState = createFeatureSelector<LogsState>('logs');

export const getActivityLog = createSelector(getLogsState, (state) =>
  state && state.activityLog ? state.activityLog : null
);

export const getActivityLogs = createSelector(getLogsState, (state) =>
  state && state.activityLogs ? state.activityLogs : null
);

export const getErrorLog = createSelector(getLogsState, (state) =>
  state && state.errorLog ? state.errorLog : null
);

export const getErrorLogs = createSelector(getLogsState, (state) =>
  state && state.errorLogs ? state.errorLogs : null
);

export const getLogsError = createSelector(getLogsState, (state) =>
  state && state.error ? state.error : null
);

export const getActivityLogsLoaded = createSelector(getLogsState, (state) =>
  state && state.activityLogsLoaded && state.activityLogsLoaded ? true : false
);

export const getActivityLogLoaded = createSelector(getLogsState, (state) =>
  state && state.activityLogLoaded && state.activityLogLoaded ? true : false
);

export const getErrorLogsLoaded = createSelector(getLogsState, (state) =>
  state && state.errorLogsLoaded && state.errorLogsLoaded ? true : false
);

export const getErrorLogLoaded = createSelector(getLogsState, (state) =>
  state && state.errorLogLoaded && state.errorLogLoaded ? true : false
);
