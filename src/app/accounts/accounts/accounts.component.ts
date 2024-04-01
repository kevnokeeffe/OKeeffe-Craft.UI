import { Component } from '@angular/core';
import { AccountsCardComponent } from './accounts-card/accounts-card.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [AccountsCardComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent {}
