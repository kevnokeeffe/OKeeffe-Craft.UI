import { Component, OnDestroy, OnInit } from '@angular/core';
import { LogsCardComponent } from '../logs-card/logs-card.component';
import { Store } from '@ngrx/store';
import { LogsActions } from '../store/logs.actions';
import {
  getActivityLogs,
  getActivityLogsLoaded,
  getErrorLogs,
  getErrorLogsLoaded,
} from '../store/logs.selectors';
import { Subscription, combineLatest } from 'rxjs';
import { ActivityLogModel } from '../models/activity-log.model';
import { ErrorLogModel } from '../models/error-log.model';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [LogsCardComponent],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent implements OnDestroy, OnInit {
  activityLogs: ActivityLogModel[] = [];
  errorLogs: ErrorLogModel[] = [];
  loadedSubscription: Subscription | undefined;
  logsSubscription: Subscription | undefined;
  loading: boolean = false;
  constructor(private store: Store<any>) {}

  ngOnDestroy(): void {
    this.loadedSubscription?.unsubscribe();
    this.logsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getLogs();
    this.getLogsLoaded();
  }

  private getLogsLoaded() {
    this.loadedSubscription = combineLatest([
      this.store.select(getActivityLogsLoaded),
      this.store.select(getErrorLogsLoaded),
    ]).subscribe(([activityLogsLoaded, errorLogsLoaded]) => {
      if (activityLogsLoaded && errorLogsLoaded) {
        this.retriveLogsFromStore();
      }
    });
  }

  private retriveLogsFromStore() {
    this.logsSubscription = combineLatest([
      this.store.select(getActivityLogs),
      this.store.select(getErrorLogs),
    ]).subscribe(([activityLogs, errorLogs]) => {
      if (activityLogs && errorLogs) {
        this.activityLogs = activityLogs;
        this.errorLogs = errorLogs;
        this.loading = false;
      }
    });
  }

  private getLogs() {
    this.loading = true;
    this.store.dispatch(LogsActions.getActivityLogs());
    this.store.dispatch(LogsActions.getErrorLogs());
  }
}
