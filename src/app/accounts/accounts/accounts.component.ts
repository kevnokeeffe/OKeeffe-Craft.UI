import { Component, OnDestroy } from '@angular/core';
import { AccountsCardComponent } from './accounts-card/accounts-card.component';
import { Store } from '@ngrx/store';
import { AccountsActions } from '../store/accounts.actions';
import { getAccounts, getAccountsLoaded } from '../store/accounts.selectors';
import { AccountResponseModel } from '../models/account-response.model';
import { Observable, Subscription } from 'rxjs';
import { getIsAdmin } from '../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [AccountsCardComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnDestroy {
  getAccountsLoadedSubscription: Subscription | undefined;
  getAccountsSubscription: Subscription | undefined;
  accounts: AccountResponseModel[] | undefined;
  loading: boolean = false;
  isAdmin$: Observable<boolean> | undefined;
  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(getIsAdmin);
    this.loading = true;
    this.store.dispatch(AccountsActions.getAccounts());
    this.getAccountsLoadedSubscription = this.store
      .select(getAccountsLoaded)
      .subscribe({
        next: (loaded) => {
          if (loaded) {
            this.getAccountsSubscription = this.store
              .select(getAccounts)
              .subscribe({
                next: (accounts) => {
                  this.accounts = accounts ?? [];
                  this.loading = false;
                },
              });
          }
        },
      });
  }
  ngOnDestroy(): void {
    this.getAccountsLoadedSubscription?.unsubscribe();
    this.getAccountsSubscription?.unsubscribe();
  }
}
