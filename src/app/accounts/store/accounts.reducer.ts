import { createReducer, on } from '@ngrx/store';
import { initialAccountsState } from './accounts.state';
import { AccountsActions } from './accounts.actions';

export const accountsReducer = createReducer(
  initialAccountsState,
  on(AccountsActions.getAccounts, (state) => state),
  on(AccountsActions.getAccountsSuccess, (state, { payload }) => {
    return {
      ...state,
      accounts: payload.data,
      accountsLoaded: true,
    };
  }),
  on(AccountsActions.getAccountsFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.getAccount, (state) => state),
  on(AccountsActions.getAccountSuccess, (state, { payload }) => {
    return {
      ...state,
      account: payload.data,
      accountLoaded: true,
    };
  }),
  on(AccountsActions.getAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.createAccount, (state) => state),
  on(AccountsActions.createAccountSuccess, (state, { payload }) => {
    return {
      ...state,
      account: payload.data,
      accountCreated: true,
    };
  }),
  on(AccountsActions.createAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.updateAccount, (state) => state),
  on(AccountsActions.updateAccountSuccess, (state, { payload }) => {
    return {
      ...state,
      account: payload.data,
      accountUpdated: true,
    };
  }),
  on(AccountsActions.updateAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.deleteAccount, (state) => state),
  on(AccountsActions.deleteAccountSuccess, (state, { payload }) => {
    return {
      ...state,
      account: null,
      accountDeleted: false,
    };
  }),
  on(AccountsActions.deleteAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.clearErrors, (state) => ({
    ...state,
    error: null,
  }))
);
