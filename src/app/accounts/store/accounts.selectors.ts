import { createFeatureSelector } from '@ngrx/store';
import { AccountsState } from './accounts.state';

export const getAccountsState =
  createFeatureSelector<AccountsState>('accounts');

export const getAccounts = (state: AccountsState) => state.accounts;
export const getAccountsLoaded = (state: AccountsState) => state.accountsLoaded;
export const getAccount = (state: AccountsState) => state.account;
export const getAccountLoaded = (state: AccountsState) => state.accountLoaded;
export const getAccountCreated = (state: AccountsState) => state.accountCreated;
export const getAccountUpdated = (state: AccountsState) => state.accountUpdated;
export const getAccountDeleted = (state: AccountsState) => state.accountDeleted;
export const getError = (state: AccountsState) => state.error;
