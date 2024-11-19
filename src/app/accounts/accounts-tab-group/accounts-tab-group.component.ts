import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountsTableComponent } from '../accounts/accounts-table/accounts-table.component';
import { Observable } from 'rxjs';
import { AccountResponseModel } from '../models/account-response.model';
import { EmailsComponent } from '../emails/emails.component';
import { ContactMessagesComponent } from '../contact-messages/contact-messages.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-accounts-tab-group',
  standalone: true,
  imports: [
    MatTabsModule,
    AccountsTableComponent,
    EmailsComponent,
    ContactMessagesComponent,
    NgIf,
  ],
  templateUrl: './accounts-tab-group.component.html',
  styleUrl: './accounts-tab-group.component.scss',
})
export class AccountsTabGroupComponent {
  @Input() accounts: AccountResponseModel[] | undefined;
  @Input() isAdmin$: Observable<boolean> | undefined;
}
