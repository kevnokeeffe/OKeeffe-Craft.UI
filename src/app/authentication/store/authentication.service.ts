import { Injectable, OnDestroy } from '@angular/core';
import { AuthenticationDataService } from './authentication.data-service';
import { ApiClient } from '../../utilities/api-client';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService
  extends AuthenticationDataService
  implements OnDestroy
{
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
