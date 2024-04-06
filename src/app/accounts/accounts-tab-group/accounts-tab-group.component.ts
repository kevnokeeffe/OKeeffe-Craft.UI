import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { AccountsTableComponent } from '../accounts/accounts-table/accounts-table.component';
import { Observable } from 'rxjs';
import { AccountResponseModel } from '../models/account-response.model';
import { EmailsComponent } from '../emails/emails.component';

@Component({
  selector: 'app-accounts-tab-group',
  standalone: true,
  imports: [MatTabsModule, AccountsTableComponent, EmailsComponent],
  templateUrl: './accounts-tab-group.component.html',
  styleUrl: './accounts-tab-group.component.scss',
})
export class AccountsTabGroupComponent {
  @Input() accounts: AccountResponseModel[] | undefined;
  @Input() isAdmin$: Observable<boolean> | undefined;
}
