import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ServiceResponseModel } from '../../models/service-response.model';
import { ActivityLogModel } from '../models/activity-log.model';
import { ErrorLogModel } from '../models/error-log.model';

export const LogsActions = createActionGroup({
  source: 'Logs',
  events: {
    getActivityLogs: emptyProps(),
    getActivityLogsSuccess: props<{
      payload: ServiceResponseModel<Array<ActivityLogModel>>;
    }>(),
    getActivityLogsFailed: props<{ error: any }>(),
    getErrorLogs: emptyProps(),
    getErrorLogsSuccess: props<{
      payload: ServiceResponseModel<Array<ErrorLogModel>>;
    }>(),
    getErrorLogsFailed: props<{ error: any }>(),
    getErrorLog: props<{ id: string }>(),
    getErrorLogSuccess: props<{
      payload: ServiceResponseModel<ErrorLogModel>;
    }>(),
    getErrorLogFailed: props<{ error: any }>(),
    getActivityLog: props<{ id: string }>(),
    getActivityLogSuccess: props<{
      payload: ServiceResponseModel<ActivityLogModel>;
    }>(),
    getActivityLogFailed: props<{ error: any }>(),
    clearErrors: emptyProps(),
    clearAll: emptyProps(),
  },
});
