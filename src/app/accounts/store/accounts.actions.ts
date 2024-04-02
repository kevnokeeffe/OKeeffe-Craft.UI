import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ServiceResponseModel } from '../../models/service-response.model';
import { AccountResponseModel } from '../models/account-response.model';
import { CreateAccountModel } from '../models/create-account.model';
import { UpdateAccountModel } from '../models/update-account.model';

export const AccountsActions = createActionGroup({
  source: 'Accounts',
  events: {
    getAccounts: emptyProps(),
    getAccountsSuccess: props<{
      payload: ServiceResponseModel<Array<AccountResponseModel>>;
    }>(),
    getAccountsFailed: props<{ error: any }>(),
    getAccount: props<{ id: string }>(),
    getAccountSuccess: props<{
      payload: ServiceResponseModel<AccountResponseModel>;
    }>(),
    getAccountFailed: props<{ error: any }>(),
    createAccount: props<{ model: CreateAccountModel }>(),
    createAccountSuccess: props<{
      payload: ServiceResponseModel<AccountResponseModel>;
    }>(),
    createAccountFailed: props<{ error: any }>(),
    updateAccount: props<{ id: string; model: UpdateAccountModel }>(),
    updateAccountSuccess: props<{
      payload: ServiceResponseModel<AccountResponseModel>;
    }>(),
    updateAccountFailed: props<{ error: any }>(),
    deleteAccount: props<{ id: string }>(),
    deleteAccountSuccess: props<{ payload: ServiceResponseModel<string> }>(),
    deleteAccountFailed: props<{ error: any }>(),
    clearErrors: emptyProps(),
    clearAll: emptyProps(),
    clearAccount: emptyProps(),
  },
});
