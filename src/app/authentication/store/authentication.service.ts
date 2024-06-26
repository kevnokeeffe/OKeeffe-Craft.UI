import { Injectable, OnDestroy } from '@angular/core';
import { AuthenticationDataService } from './authentication.data-service';
import { ApiClient } from '../../utilities/api-client';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService
  extends AuthenticationDataService
  implements OnDestroy
{
  constructor(
    protected override api: ApiClient,
    protected override store: Store<any>
  ) {
    super(api, store);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
