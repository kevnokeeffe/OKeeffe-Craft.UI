import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, combineLatest, takeUntil } from 'rxjs';
import {
  AccountsEndpointsModel,
  ContactMessagesEndpointsModel,
  EmailEndpointsModel,
} from '../../configuration/models/configuration.settings.model';
import { ApiClient } from '../../utilities/api-client';
import {
  getAccountsEndpoints,
  getContactMessagesEndpoints,
  getEmailEndpoints,
} from '../../configuration/store/configuration.selectors';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AccountResponseModel } from '../models/account-response.model';
import { UpdateAccountModel } from '../models/update-account.model';
import { Utils } from '../../utilities/utils';
import { CreateAccountModel } from '../models/create-account.model';
import { EmailModel } from '../models/email.model';
import { ContactMessageModel } from '../models/contact-message.model';

export class AccountsDataService {
  accountsEndpoints!: AccountsEndpointsModel;
  emailEndpoints!: EmailEndpointsModel;
  contactMessageEndpoints!: ContactMessagesEndpointsModel;
  public destroy$ = new Subject<void>();
  constructor(
    protected api: ApiClient,
    protected store: Store<any>,
    protected route: Router
  ) {
    combineLatest([
      this.store.select(getAccountsEndpoints),
      this.store.select(getEmailEndpoints),
      this.store.select(getContactMessagesEndpoints),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ([accountsEndpoints, emailEndpoints, contactMessageEndpoints]) => {
          if (accountsEndpoints && emailEndpoints && contactMessageEndpoints) {
            this.accountsEndpoints = accountsEndpoints;
            this.emailEndpoints = emailEndpoints;
            this.contactMessageEndpoints = contactMessageEndpoints;
          }
        }
      );
  }

  getAccounts(): Observable<ServiceResponseModel<Array<AccountResponseModel>>> {
    return this.api.get<ServiceResponseModel<Array<AccountResponseModel>>>(
      this.accountsEndpoints?.getAccounts
    );
  }

  getAccount(id: string): Observable<any> {
    return this.api.get<ServiceResponseModel<AccountResponseModel>>(
      Utils.InjectUrlParams(this.accountsEndpoints?.getAccount, {
        id: id,
      })
    );
  }

  createAccount(
    model: CreateAccountModel
  ): Observable<ServiceResponseModel<AccountResponseModel>> {
    return this.api.post<ServiceResponseModel<AccountResponseModel>>(
      this.accountsEndpoints?.createAccount,
      model
    );
  }

  updateAccount(
    id: string,
    model: UpdateAccountModel
  ): Observable<ServiceResponseModel<AccountResponseModel>> {
    return this.api.put<ServiceResponseModel<AccountResponseModel>>(
      Utils.InjectUrlParams(this.accountsEndpoints?.updateAccount, {
        id: id,
      }),
      model
    );
  }

  deleteAccount(id: string): Observable<ServiceResponseModel<string>> {
    return this.api.delete<ServiceResponseModel<string>>(
      Utils.InjectUrlParams(this.accountsEndpoints?.deleteAccount, {
        id: id,
      })
    );
  }

  getEmails(): Observable<ServiceResponseModel<Array<EmailModel>>> {
    return this.api.get<ServiceResponseModel<Array<EmailModel>>>(
      this.emailEndpoints?.getEmails
    );
  }

  getEmail(id: string): Observable<ServiceResponseModel<EmailModel>> {
    return this.api.get<ServiceResponseModel<EmailModel>>(
      Utils.InjectUrlParams(this.emailEndpoints?.getEmail, {
        id: id,
      })
    );
  }

  createContactMessage(model: any): Observable<ServiceResponseModel<string>> {
    return this.api.post<ServiceResponseModel<string>>(
      this.contactMessageEndpoints?.createContactMessage,
      model
    );
  }

  getContactMessages(): Observable<ServiceResponseModel<Array<ContactMessageModel>>> {
    return this.api.get<ServiceResponseModel<Array<ContactMessageModel>>>(
      this.contactMessageEndpoints?.getContactMessages
    );
  }
}
