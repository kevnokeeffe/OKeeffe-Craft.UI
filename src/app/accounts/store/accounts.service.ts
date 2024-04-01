import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiClient } from '../../utilities/api-client';
import { AccountsDataService } from './accounts.data-service';

@Injectable({
  providedIn: 'root',
})
export class AccountsService extends AccountsDataService implements OnDestroy {
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
