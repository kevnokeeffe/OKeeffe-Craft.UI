import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AccountResponseModel } from '../../models/account-response.model';
import { Store } from '@ngrx/store';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AccountBottomSheetComponent } from '../../dialogs/account-bottom-sheet/account-bottom-sheet.component';
import { AccountsTabGroupComponent } from '../../accounts-tab-group/accounts-tab-group.component';

@Component({
  selector: 'app-accounts-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBar,
    AsyncPipe,
    AccountsTabGroupComponent,
  ],
  templateUrl: './accounts-card.component.html',
  styleUrl: './accounts-card.component.scss',
})
export class AccountsCardComponent {
  @Input() accounts: AccountResponseModel[] | undefined;
  @Input() loading$: Observable<boolean> | undefined;
  @Input() isAdmin$: Observable<boolean> | undefined;
  constructor(private bottomSheet: MatBottomSheet, private store: Store<any>) {}
  createAccount() {
    this.bottomSheet.open(AccountBottomSheetComponent, {
      data: {
        id: null,
        isCreate: true,
        title: 'Create Account',
        subtitle: 'Create a new account',
      },
    });
  }
}
