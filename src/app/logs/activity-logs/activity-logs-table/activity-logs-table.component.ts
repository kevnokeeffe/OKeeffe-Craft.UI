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
import { ActivityLogModel } from '../../models/activity-log.model';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AsyncPipe, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivityLogDetailsDialogComponent } from '../../dialogs/activity-log-details-dialog/activity-log-details-dialog.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getIsAdmin } from '../../../authentication/store/authentication.selectors';
import { Utils } from '../../../utilities/utils';

@Component({
  selector: 'app-activity-logs-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconButton,
    MatIcon,
    NgStyle,
    AsyncPipe,
  ],
  templateUrl: './activity-logs-table.component.html',
  styleUrl: './activity-logs-table.component.scss',
})
export class ActivityLogsTableComponent implements AfterViewInit, OnChanges {
  @Input() activityLogs: ActivityLogModel[] | null | undefined;
  displayedColumns: string[] = ['logDetails', 'actions'];
  dataSource: MatTableDataSource<ActivityLogModel>;
  isAdmin$: Observable<boolean> | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private dialog: MatDialog, private store: Store<any>) {
    this.dataSource = new MatTableDataSource(this.activityLogs!);
    this.isAdmin$ = this.store.select(getIsAdmin);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activityLogs'] && changes['activityLogs'].currentValue) {
      this.populateTable(changes['activityLogs'].currentValue);
    }
  }

  maskString(str: string): string {
    return Utils.maskString(str);
  }

  openLogDetails(log: ActivityLogModel) {
    this.dialog.open(ActivityLogDetailsDialogComponent, {
      data: log,
    });
  }

  populateTable(logs: ActivityLogModel[] = this.activityLogs ?? []) {
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
