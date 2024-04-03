import { Component, Input } from '@angular/core';
import { ErrorLogsTableComponent } from './error-logs-table/error-logs-table.component';
import { ErrorLogModel } from '../models/error-log.model';

@Component({
  selector: 'app-error-logs',
  standalone: true,
  imports: [ErrorLogsTableComponent],
  templateUrl: './error-logs.component.html',
  styleUrl: './error-logs.component.scss',
})
export class ErrorLogsComponent {
  @Input() errorLogs: ErrorLogModel[] | null | undefined;
}
