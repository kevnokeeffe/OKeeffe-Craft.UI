import {
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmationDialogComponent } from '../../../layout/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AccountResponseModel } from '../../models/account-response.model';
import { AccountsActions } from '../../store/accounts.actions';
import { Store } from '@ngrx/store';
import { getAccountDeleted } from '../../store/accounts.selectors';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AccountBottomSheetComponent } from '../../dialogs/account-bottom-sheet/account-bottom-sheet.component';

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
    MatTooltipModule,
    AsyncPipe,
  ],
  templateUrl: './accounts-table.component.html',
  styleUrl: './accounts-table.component.scss',
})
export class AccountsTableComponent implements OnChanges, OnDestroy {
  displayedColumns: string[] = [
    'fullName',
    'email',
    'role',
    'isVerified',
    'actions',
  ];
  @Input() isAdmin$: Observable<boolean> | undefined;
  dataSource: MatTableDataSource<AccountResponseModel>;
  getAccountDeletedSubscription: Subscription | undefined;
  @Input() accounts: AccountResponseModel[] | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private store: Store<any>
  ) {
    this.dataSource = new MatTableDataSource(this.accounts ?? []);
  }
  ngOnDestroy(): void {
    this.getAccountDeletedSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accounts'] && changes['accounts'].currentValue) {
      this.dataSource = new MatTableDataSource(
        changes['accounts'].currentValue
      );
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }
  }

  openEditDialog(id: string) {
    this.bottomSheet
      .open(AccountBottomSheetComponent, {
        data: {
          id: id,
          isCreate: false,
          title: 'Edit Account',
          subtitle: 'Edit the account details below.',
        },
      })
      .afterDismissed()
      .subscribe({
        next: (res) => {
          if (res) {
            this.store.dispatch(AccountsActions.getAccounts());
          }
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
            this.getAccountDeletedSubscription = this.store
              .select(getAccountDeleted)
              .subscribe({
                next: (deleted) => {
                  if (deleted) {
                    this.store.dispatch(AccountsActions.getAccounts());
                  }
                },
              });
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
