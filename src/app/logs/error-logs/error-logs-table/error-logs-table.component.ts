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

@Component({
  selector: 'app-error-logs-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './error-logs-table.component.html',
  styleUrl: './error-logs-table.component.scss',
})
export class ErrorLogsTableComponent implements AfterViewInit, OnChanges {
  @Input() errorLogs: ErrorLogModel[] | null | undefined;
  displayedColumns: string[] = ['id'];
  dataSource: MatTableDataSource<ErrorLogModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.errorLogs!);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorLogs'] && changes['errorLogs'].currentValue) {
      this.populateTable(changes['errorLogs'].currentValue);
    }
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
