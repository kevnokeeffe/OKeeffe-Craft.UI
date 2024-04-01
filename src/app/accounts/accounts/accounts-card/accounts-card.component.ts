import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AccountsTableComponent } from '../accounts-table/accounts-table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-accounts-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    AccountsTableComponent,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './accounts-card.component.html',
  styleUrl: './accounts-card.component.scss',
})
export class AccountsCardComponent {}
