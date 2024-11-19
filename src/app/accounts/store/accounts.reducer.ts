import { createReducer, on } from '@ngrx/store';
import { initialAccountsState } from './accounts.state';
import { AccountsActions } from './accounts.actions';

export const accountsReducer = createReducer(
  initialAccountsState,
  on(AccountsActions.getAccounts, (state) => state),
  on(AccountsActions.getAccountsSuccess, (state, { payload }) => {
    return {
      ...state,
      accounts: payload,
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
      account: payload,
      accountLoaded: true,
    };
  }),
  on(AccountsActions.getAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.createAccount, (state) => {
    return {
      ...state,
      accountCreated: false,
    };
  }),
  on(AccountsActions.createAccountSuccess, (state, { payload }) => {
    return {
      ...state,
      account: payload,
      accountCreated: payload.success,
    };
  }),
  on(AccountsActions.createAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.updateAccount, (state) => {
    return {
      ...state,
      accountUpdated: false,
    };
  }),
  on(AccountsActions.updateAccountSuccess, (state, { payload }) => {
    return {
      ...state,
      account: payload,
      accountUpdated: payload.success,
    };
  }),
  on(AccountsActions.updateAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.deleteAccount, (state) => {
    return {
      ...state,
      accountDeleted: false,
    };
  }),
  on(AccountsActions.deleteAccountSuccess, (state, { payload }) => {
    return {
      ...state,
      accountDeleted: payload.success,
    };
  }),
  on(AccountsActions.deleteAccountFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.clearErrors, (state) => ({
    ...state,
    error: null,
  })),
  on(AccountsActions.clearAll, (state) => initialAccountsState),
  on(AccountsActions.clearAccount, (state) => ({
    ...state,
    account: null,
    accountLoaded: false,
  })),
  on(AccountsActions.getEmails, (state) => state),
  on(AccountsActions.getEmailsSuccess, (state, { payload }) => {
    return {
      ...state,
      emailsResponse: payload,
      emailsLoaded: payload.success,
    };
  }),
  on(AccountsActions.getEmailsFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.getEmail, (state) => state),
  on(AccountsActions.getEmailSuccess, (state, { payload }) => {
    return {
      ...state,
      emailResponse: payload,
      emailLoaded: payload.success,
    };
  }),
  on(AccountsActions.getEmailFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.getContactMessages, (state) => state),
  on(AccountsActions.getContactMessagesSuccess, (state, { payload }) => {
    return {
      ...state,
      contactMessages: payload,
      contactMessagesLoaded: payload.success,
    };
  }),
  on(AccountsActions.getContactMessagesFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.createContactMessage, (state) => state),
  on(AccountsActions.createContactMessageSuccess, (state, { payload }) => {
    return {
      ...state,
      contactMessageResponse: payload,
      contactMessageCreated: payload.success,
    };
  }),
  on(AccountsActions.createContactMessageFailed, (state, { error }) => ({
    ...state,
    error,
  })),
  on(AccountsActions.clearContactMessage, (state) => ({
    ...state,
    contactMessageResponse: null,
    contactMessageCreated: false,
  }))
);
