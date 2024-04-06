import { AsyncPipe, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmailModel } from '../../models/email.model';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAccountId } from '../../../authentication/store/authentication.selectors';
import { Utils } from '../../../utilities/utils';
import { EmailDetailsDialogComponent } from '../../dialogs/email-details-dialog/email-details-dialog.component';

@Component({
  selector: 'app-emails-table',
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
    DatePipe,
  ],
  templateUrl: './emails-table.component.html',
  styleUrl: './emails-table.component.scss',
})
export class EmailsTableComponent implements OnChanges, AfterViewInit {
  displayedColumns: string[] = ['subject', 'toEmail', 'sentDate', 'actions'];
  @Input() isAdmin$: Observable<boolean> | undefined;
  dataSource: MatTableDataSource<EmailModel>;
  accountId$: Observable<string | null>;
  @Input() emails: EmailModel[] | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private dialog: MatDialog, private store: Store<any>) {
    this.dataSource = new MatTableDataSource(this.emails ?? []);
    this.accountId$ = this.store.select(getAccountId);
  }

  ngAfterViewInit(): void {
    this.populateTable();
  }

  maskString(value: string): string {
    return Utils.maskString(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['emails'] && changes['emails'].currentValue) {
      this.populateTable(changes['emails'].currentValue);
    }
  }

  populateTable(emails: EmailModel[] = this.emails ?? []) {
    this.dataSource = new MatTableDataSource(emails);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  openEmailDetails(email: EmailModel) {
    this.dialog.open(EmailDetailsDialogComponent, {
      data: email,
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
