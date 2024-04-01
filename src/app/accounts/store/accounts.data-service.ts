import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccountsEndpointsModel } from '../../configuration/models/configuration.settings.model';
import { ApiClient } from '../../utilities/api-client';
import { getAccountsEndpoints } from '../../configuration/store/configuration.selectors';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AccountResponseModel } from '../models/account-response.model';

export class AccountsDataService {
  accountsEndpoints: AccountsEndpointsModel | undefined;
  public destroy$ = new Subject<void>();
  constructor(
    protected api: ApiClient,
    protected store: Store<any>,
    protected route: Router
  ) {
    this.store
      .select(getAccountsEndpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((endpoints) => {
        if (endpoints) {
          this.accountsEndpoints = endpoints;
        }
      });
  }

  getAccounts(): Observable<any> {
    return this.api.get<ServiceResponseModel<Array<AccountResponseModel>>>(
      this.accountsEndpoints?.getAccounts ?? ''
    );
  }
  getAccount(id: string): Observable<any> {
    return this.api.get<ServiceResponseModel<AccountResponseModel>>(
      this.accountsEndpoints?.getAccount ?? '' + id
    );
  }
  createAccount(model: any): Observable<any> {
    return this.api.post<ServiceResponseModel<AccountResponseModel>>(
      this.accountsEndpoints?.createAccount ?? '',
      model
    );
  }
  updateAccount(model: any): Observable<any> {
    return this.api.put<ServiceResponseModel<AccountResponseModel>>(
      this.accountsEndpoints?.updateAccount ?? '',
      model
    );
  }
  deleteAccount(id: string): Observable<any> {
    return this.api.delete<ServiceResponseModel<any>>(
      this.accountsEndpoints?.deleteAccount ?? '' + id
    );
  }
}
