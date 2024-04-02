import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AccountsEndpointsModel } from '../../configuration/models/configuration.settings.model';
import { ApiClient } from '../../utilities/api-client';
import { getAccountsEndpoints } from '../../configuration/store/configuration.selectors';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AccountResponseModel } from '../models/account-response.model';
import { UpdateAccountModel } from '../models/update-account.model';
import { Utils } from '../../utilities/utils';
import { CreateAccountModel } from '../models/create-account.model';

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

  getAccounts(): Observable<ServiceResponseModel<Array<AccountResponseModel>>> {
    return this.api.get<ServiceResponseModel<Array<AccountResponseModel>>>(
      this.accountsEndpoints?.getAccounts ?? ''
    );
  }

  getAccount(id: string): Observable<any> {
    return this.api.get<ServiceResponseModel<AccountResponseModel>>(
      Utils.InjectUrlParams(this.accountsEndpoints?.getAccount ?? '', {
        id: id,
      })
    );
  }

  createAccount(
    model: CreateAccountModel
  ): Observable<ServiceResponseModel<AccountResponseModel>> {
    return this.api.post<ServiceResponseModel<AccountResponseModel>>(
      this.accountsEndpoints?.createAccount ?? '',
      model
    );
  }

  updateAccount(
    id: string,
    model: UpdateAccountModel
  ): Observable<ServiceResponseModel<AccountResponseModel>> {
    return this.api.put<ServiceResponseModel<AccountResponseModel>>(
      Utils.InjectUrlParams(this.accountsEndpoints?.updateAccount ?? '', {
        id: id,
      }),
      model
    );
  }

  deleteAccount(id: string): Observable<ServiceResponseModel<string>> {
    return this.api.delete<ServiceResponseModel<string>>(
      Utils.InjectUrlParams(this.accountsEndpoints?.deleteAccount ?? '', {
        id: id,
      })
    );
  }
}
