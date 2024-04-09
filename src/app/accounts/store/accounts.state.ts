import { ServiceResponseModel } from '../../models/service-response.model';
import { AccountResponseModel } from '../models/account-response.model';
import { EmailModel } from '../models/email.model';

export interface AccountsState {
  account: ServiceResponseModel<AccountResponseModel> | null;
  accountLoaded: boolean;
  accounts: ServiceResponseModel<Array<AccountResponseModel>> | null;
  accountsLoaded: boolean;
  accountCreated: boolean;
  accountUpdated: boolean;
  accountDeleted: boolean;
  emailResponse: ServiceResponseModel<EmailModel> | null;
  emailsResponse: ServiceResponseModel<Array<EmailModel>> | null;
  emailLoaded: boolean;
  emailsLoaded: boolean;
  error: any | null;
  contactMessageResponse: ServiceResponseModel<string> | null;
  contactMessageCreated: boolean;
}

export const initialAccountsState: AccountsState = {
  account: null,
  accountLoaded: false,
  accounts: null,
  accountsLoaded: false,
  accountCreated: false,
  accountUpdated: false,
  accountDeleted: false,
  emailResponse: null,
  emailsResponse: null,
  emailLoaded: false,
  emailsLoaded: false,
  error: null,
  contactMessageResponse: null,
  contactMessageCreated: false,
};
