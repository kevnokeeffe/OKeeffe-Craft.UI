import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountsState } from './accounts.state';

export const getAccountsState =
  createFeatureSelector<AccountsState>('accounts');

export const getAccounts = createSelector(
  getAccountsState,
  (state: AccountsState) => state.accounts
);

export const getAccountUpdated = createSelector(
  getAccountsState,
  (state: AccountsState) => state.accountUpdated
);

export const getAccountDeleted = createSelector(
  getAccountsState,
  (state: AccountsState) => state.accountDeleted
);

export const getAccountCreated = createSelector(
  getAccountsState,
  (state: AccountsState) => state.accountCreated
);

export const getAccount = createSelector(
  getAccountsState,
  (state: AccountsState) => state.account
);

export const getAccountsLoaded = createSelector(
  getAccountsState,
  (state: AccountsState) => state.accountsLoaded
);

export const getAccountLoaded = createSelector(
  getAccountsState,
  (state: AccountsState) => state.accountLoaded
);

export const getEmails = createSelector(
  getAccountsState,
  (state: AccountsState) => state.emailsResponse
);

export const getEmail = createSelector(
  getAccountsState,
  (state: AccountsState) => state.emailResponse
);

export const getEmailsLoaded = createSelector(
  getAccountsState,
  (state: AccountsState) => state.emailsLoaded
);

export const getEmailLoaded = createSelector(
  getAccountsState,
  (state: AccountsState) => state.emailLoaded
);

export const getError = createSelector(
  getAccountsState,
  (state: AccountsState) => state.error
);

export const getContactMessage = createSelector(
  getAccountsState,
  (state: AccountsState) => state.contactMessageResponse
);

export const getContactMessageCreated = createSelector(
  getAccountsState,
  (state: AccountsState) => state.contactMessageCreated
);
