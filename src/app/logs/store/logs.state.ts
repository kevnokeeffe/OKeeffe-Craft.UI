import { ActivityLogModel } from '../models/activity-log.model';
import { ErrorLogModel } from '../models/error-log.model';

export interface LogsState {
  error: any | null;
  activityLogs: ActivityLogModel[] | null;
  activityLogLoaded: boolean;
  activityLogsLoaded: boolean;
  errorLogs: ErrorLogModel[] | null;
  errorLog: ErrorLogModel | null;
  errorLogsLoaded: boolean;
  errorLogLoaded: boolean;
  activityLog: ActivityLogModel | null;
}

export const initialLogsState: LogsState = {
  error: null,
  activityLogs: null,
  errorLogs: null,
  errorLog: null,
  activityLog: null,
  activityLogLoaded: false,
  activityLogsLoaded: false,
  errorLogsLoaded: false,
  errorLogLoaded: false,
};
