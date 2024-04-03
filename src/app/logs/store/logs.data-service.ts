import { Observable, Subject, takeUntil } from 'rxjs';
import { LogsEndpointsModel } from '../../configuration/models/configuration.settings.model';
import { getLogsEndpoints } from '../../configuration/store/configuration.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiClient } from '../../utilities/api-client';
import { ServiceResponseModel } from '../../models/service-response.model';
import { ActivityLogModel } from '../models/activity-log.model';
import { ErrorLogModel } from '../models/error-log.model';
import { Utils } from '../../utilities/utils';

export class LogsDataService {
  logsEndpoints: LogsEndpointsModel | undefined;
  public destroy$ = new Subject<void>();
  constructor(
    protected api: ApiClient,
    protected store: Store<any>,
    protected route: Router
  ) {
    this.store
      .select(getLogsEndpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((endpoints) => {
        if (endpoints) {
          this.logsEndpoints = endpoints;
        }
      });
  }

  getActivityLog(
    id: string
  ): Observable<ServiceResponseModel<ActivityLogModel>> {
    return this.api.get<ServiceResponseModel<ActivityLogModel>>(
      Utils.InjectUrlParams(this.logsEndpoints?.getActivityLog ?? '', { id })
    );
  }

  getActivityLogs(): Observable<ServiceResponseModel<Array<ActivityLogModel>>> {
    return this.api.get<ServiceResponseModel<Array<ActivityLogModel>>>(
      this.logsEndpoints?.getActivityLogs ?? ''
    );
  }

  getErrorLog(id: string): Observable<ServiceResponseModel<ErrorLogModel>> {
    return this.api.get<ServiceResponseModel<ErrorLogModel>>(
      Utils.InjectUrlParams(this.logsEndpoints?.getErrorLog ?? '', { id })
    );
  }

  getErrorLogs(): Observable<ServiceResponseModel<Array<ErrorLogModel>>> {
    return this.api.get<ServiceResponseModel<Array<ErrorLogModel>>>(
      this.logsEndpoints?.getErrorLogs ?? ''
    );
  }
}
