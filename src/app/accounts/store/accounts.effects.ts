import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountsService } from './accounts.service';
import { switchMap, map, catchError, of } from 'rxjs';
import { AccountsActions } from './accounts.actions';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private accountsService: AccountsService
  ) {}

  getAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.getAccounts),
      switchMap(() =>
        this.accountsService.getAccounts().pipe(
          map((response) =>
            AccountsActions.getAccountsSuccess({ payload: response })
          ),
          catchError((error) =>
            of(AccountsActions.getAccountsFailed({ error }))
          )
        )
      )
    )
  );

  getAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.getAccount),
      switchMap(({ id }) =>
        this.accountsService.getAccount(id).pipe(
          map((response) =>
            AccountsActions.getAccountSuccess({ payload: response })
          ),
          catchError((error) => of(AccountsActions.getAccountFailed({ error })))
        )
      )
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.createAccount),
      switchMap(({ model }) =>
        this.accountsService.createAccount(model).pipe(
          map((response) =>
            AccountsActions.createAccountSuccess({ payload: response })
          ),
          catchError((error) =>
            of(AccountsActions.createAccountFailed({ error }))
          )
        )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.updateAccount),
      switchMap(({ id, model }) =>
        this.accountsService.updateAccount(id, model).pipe(
          map((response) =>
            AccountsActions.updateAccountSuccess({ payload: response })
          ),
          catchError((error) =>
            of(AccountsActions.updateAccountFailed({ error }))
          )
        )
      )
    )
  );

  deleteAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.deleteAccount),
      switchMap(({ id }) =>
        this.accountsService.deleteAccount(id).pipe(
          map((response) =>
            AccountsActions.deleteAccountSuccess({ payload: response })
          ),
          catchError((error) =>
            of(AccountsActions.deleteAccountFailed({ error }))
          )
        )
      )
    )
  );

  getEmails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.getEmails),
      switchMap(() =>
        this.accountsService.getEmails().pipe(
          map((response) =>
            AccountsActions.getEmailsSuccess({ payload: response })
          ),
          catchError((error) => of(AccountsActions.getEmailsFailed({ error })))
        )
      )
    )
  );

  getEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.getEmail),
      switchMap(({ id }) =>
        this.accountsService.getEmail(id).pipe(
          map((response) =>
            AccountsActions.getEmailSuccess({ payload: response })
          ),
          catchError((error) => of(AccountsActions.getEmailFailed({ error })))
        )
      )
    )
  );

  getContactMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.getContactMessages),
      switchMap(() =>
        this.accountsService.getContactMessages().pipe(
          map((response) =>
            AccountsActions.getContactMessagesSuccess({ payload: response })
          ),
          catchError((error) =>
            of(AccountsActions.getContactMessagesFailed({ error }))
          )
        )
      )
    )
  );

  createContactMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.createContactMessage),
      switchMap(({ model }) =>
        this.accountsService.createContactMessage(model).pipe(
          map((response) =>
            AccountsActions.createContactMessageSuccess({ payload: response })
          ),
          catchError((error) =>
            of(AccountsActions.createContactMessageFailed({ error }))
          )
        )
      )
    )
  );
}
