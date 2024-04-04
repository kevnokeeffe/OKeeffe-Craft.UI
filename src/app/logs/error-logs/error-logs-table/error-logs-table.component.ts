import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ErrorLogModel } from '../../models/error-log.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ErrorLogDetailsDialogComponent } from '../../dialogs/error-log-details-dialog/error-log-details-dialog.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { getIsAdmin } from '../../../authentication/store/authentication.selectors';
import { Utils } from '../../../utilities/utils';

@Component({
  selector: 'app-error-logs-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIcon,
    MatIconButton,
    AsyncPipe,
  ],
  templateUrl: './error-logs-table.component.html',
  styleUrl: './error-logs-table.component.scss',
})
export class ErrorLogsTableComponent implements AfterViewInit, OnChanges {
  @Input() errorLogs: ErrorLogModel[] | null | undefined;
  displayedColumns: string[] = ['logDetails', 'actions'];
  dataSource: MatTableDataSource<ErrorLogModel>;
  isAdmin$: Observable<boolean> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private dialog: MatDialog, private store: Store<any>) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.errorLogs!);
    this.isAdmin$ = this.store.select(getIsAdmin);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorLogs'] && changes['errorLogs'].currentValue) {
      this.populateTable(changes['errorLogs'].currentValue);
    }
  }

  maskString(str: string): string {
    return Utils.maskString(str);
  }

  openLogDetails(log: ErrorLogModel) {
    this.dialog.open(ErrorLogDetailsDialogComponent, {
      data: log,
    });
  }

  populateTable(logs: ErrorLogModel[] = this.errorLogs ?? []) {
    this.dataSource = new MatTableDataSource(logs);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
  }

  ngAfterViewInit() {
    this.populateTable();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
