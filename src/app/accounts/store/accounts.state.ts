import { ServiceResponseModel } from '../../models/service-response.model';
import { AccountResponseModel } from '../models/account-response.model';

export interface AccountsState {
  account: ServiceResponseModel<AccountResponseModel> | null;
  accountLoaded: boolean;
  accounts: ServiceResponseModel<Array<AccountResponseModel>> | null;
  accountsLoaded: boolean;
  accountCreated: boolean;
  accountUpdated: boolean;
  accountDeleted: boolean;
  error: any | null;
}

export const initialAccountsState: AccountsState = {
  account: null,
  accountLoaded: false,
  accounts: null,
  accountsLoaded: false,
  accountCreated: false,
  accountUpdated: false,
  accountDeleted: false,
  error: null,
};
