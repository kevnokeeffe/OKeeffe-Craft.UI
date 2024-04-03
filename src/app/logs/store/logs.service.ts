import { Injectable, OnDestroy } from '@angular/core';
import { LogsDataService } from './logs.data-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiClient } from '../../utilities/api-client';

@Injectable({
  providedIn: 'root',
})
export class LogsService extends LogsDataService implements OnDestroy {
  constructor(
    protected override api: ApiClient,
    protected override store: Store<any>,
    protected override route: Router
  ) {
    super(api, store, route);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
