import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../layout/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AccountResponseModel } from '../../models/account-response.model';
import { AccountsActions } from '../../store/accounts.actions';
import { Store } from '@ngrx/store';
import {
  getAccountDeleted,
  getAccountUpdated,
} from '../../store/accounts.selectors';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AccountBottomSheetComponent } from '../../dialogs/account-bottom-sheet/account-bottom-sheet.component';
import { getAccountId } from '../../../authentication/store/authentication.selectors';
import { Utils } from '../../../utilities/utils';

@Component({
  selector: 'app-accounts-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './accounts-table.component.html',
  styleUrl: './accounts-table.component.scss',
})
export class AccountsTableComponent
  implements OnChanges, OnDestroy, AfterViewInit
{
  displayedColumns: string[] = [
    'fullName',
    'email',
    'role',
    'isVerified',
    'actions',
  ];
  @Input() isAdmin$: Observable<boolean> | undefined;
  dataSource: MatTableDataSource<AccountResponseModel>;
  getAccountSubscription: Subscription | undefined;
  accountId$: Observable<string | null>;
  @Input() accounts: AccountResponseModel[] | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private store: Store<any>
  ) {
    this.dataSource = new MatTableDataSource(this.accounts ?? []);
    this.accountId$ = this.store.select(getAccountId);
  }

  ngAfterViewInit(): void {
    this.populateTable();
    this.accountDelSub();
  }

  maskString(value: string): string {
    return Utils.maskString(value);
  }

  accountDelSub(): void {
    this.getAccountSubscription = this.store
      .select(getAccountDeleted)

      .subscribe({
        next: (deleted) => {
          if (deleted) {
            this.store.dispatch(AccountsActions.getAccounts());
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.getAccountSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accounts'] && changes['accounts'].currentValue) {
      this.populateTable(changes['accounts'].currentValue);
    }
  }

  populateTable(accounts: AccountResponseModel[] = this.accounts ?? []) {
    this.dataSource = new MatTableDataSource(accounts);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  openEditDialog(id: string) {
    this.bottomSheet.open(AccountBottomSheetComponent, {
      data: {
        id: id,
        isCreate: false,
        title: 'Edit Account',
        subtitle: 'Edit the account details below.',
      },
    });
  }

  deleteAccountDialog(id: string) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          id: id,
          title: 'Delete Account',
          message: 'Are you sure you want to delete this account?',
          color: 'warn',
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.store.dispatch(AccountsActions.deleteAccount({ id }));
          }
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
