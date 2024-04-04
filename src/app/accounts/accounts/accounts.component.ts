import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class AccountsComponent implements OnDestroy, OnInit {
  getAccountsSubscription: Subscription | undefined;
  accounts: AccountResponseModel[] | undefined;
  loading$: Observable<boolean> | undefined;
  isAdmin$: Observable<boolean> | undefined;

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(getIsAdmin);
    this.loading$ = this.store.select(getAccountsLoaded);
  }

  ngOnInit(): void {
    this.store.dispatch(AccountsActions.getAccounts());
    this.getAccounts();
  }

  getAccounts(): void {
    this.getAccountsSubscription = this.store.select(getAccounts).subscribe({
      next: (accounts) => {
        this.accounts = accounts?.data ?? [];
      },
    });
  }
  ngOnDestroy(): void {
    this.getAccountsSubscription?.unsubscribe();
  }
}
