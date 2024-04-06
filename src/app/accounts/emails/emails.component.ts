import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmailModel } from '../models/email.model';
import { getEmails, getEmailsLoaded } from '../store/accounts.selectors';
import { getIsAdmin } from '../../authentication/store/authentication.selectors';
import { Observable, Subscription } from 'rxjs';
import { AccountsActions } from '../store/accounts.actions';
import { EmailsTableComponent } from './emails-table/emails-table.component';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [EmailsTableComponent],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss',
})
export class EmailsComponent implements OnDestroy, OnInit {
  getEmailsSubscription: Subscription | undefined;
  emails: EmailModel[] | undefined;
  loading$: Observable<boolean> | undefined;
  isAdmin$: Observable<boolean> | undefined;

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(getIsAdmin);
    this.loading$ = this.store.select(getEmailsLoaded);
  }

  ngOnInit(): void {
    this.store.dispatch(AccountsActions.getEmails());
    this.getEmails();
  }

  getEmails(): void {
    this.getEmailsSubscription = this.store.select(getEmails).subscribe({
      next: (emails) => {
        if (emails) this.emails = emails.data;
      },
    });
  }

  ngOnDestroy(): void {
    this.getEmailsSubscription?.unsubscribe();
  }
}
