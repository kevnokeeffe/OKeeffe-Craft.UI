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

@Component({
  selector: 'app-activity-logs-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './activity-logs-table.component.html',
  styleUrl: './activity-logs-table.component.scss',
})
export class ActivityLogsTableComponent implements AfterViewInit, OnChanges {
  @Input() activityLogs: ActivityLogModel[] | null | undefined;
  displayedColumns: string[] = ['id'];
  dataSource: MatTableDataSource<ActivityLogModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor() {
    this.dataSource = new MatTableDataSource(this.activityLogs!);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activityLogs'] && changes['activityLogs'].currentValue) {
      this.populateTable(changes['activityLogs'].currentValue);
    }
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
