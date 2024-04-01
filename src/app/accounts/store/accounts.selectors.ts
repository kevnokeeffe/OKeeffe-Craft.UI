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
