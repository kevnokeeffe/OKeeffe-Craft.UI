import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import {
  AccountsEndpointsModel,
  EmailEndpointsModel,
} from '../../configuration/models/configuration.settings.model';
import { ApiClient } from '../../utilities/api-client';
import {
  getAccountsEndpoints,
  getEmailEndpoints,
} from '../../configuration/store/configuration.selectors';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AccountResponseModel } from '../models/account-response.model';
import { UpdateAccountModel } from '../models/update-account.model';
import { Utils } from '../../utilities/utils';
import { CreateAccountModel } from '../models/create-account.model';
import { EmailModel } from '../models/email.model';

export class AccountsDataService {
  accountsEndpoints: AccountsEndpointsModel | undefined;
  emailEndpoints: EmailEndpointsModel | undefined;
  public destroy$ = new Subject<void>();
  constructor(
    protected api: ApiClient,
    protected store: Store<any>,
    protected route: Router
  ) {
    combineLatest([
      this.store.select(getAccountsEndpoints),
      this.store.select(getEmailEndpoints),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([accountsEndpoints, emailEndpoints]) => {
        if (accountsEndpoints && emailEndpoints) {
          console.log(
            'AccountsDataService: ',
            accountsEndpoints,
            emailEndpoints
          );
          this.accountsEndpoints = accountsEndpoints;
          this.emailEndpoints = emailEndpoints;
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

  getEmails(): Observable<ServiceResponseModel<Array<EmailModel>>> {
    return this.api.get<ServiceResponseModel<Array<EmailModel>>>(
      this.emailEndpoints?.getEmails ?? ''
    );
  }

  getEmail(id: string): Observable<ServiceResponseModel<EmailModel>> {
    return this.api.get<ServiceResponseModel<EmailModel>>(
      Utils.InjectUrlParams(this.emailEndpoints?.getEmail ?? '', {
        id: id,
      })
    );
  }
}
