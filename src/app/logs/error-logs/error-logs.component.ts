import { Component } from '@angular/core';
import { ErrorLogsTableComponent } from './error-logs-table/error-logs-table.component';

@Component({
  selector: 'app-error-logs',
  standalone: true,
  imports: [ErrorLogsTableComponent],
  templateUrl: './error-logs.component.html',
  styleUrl: './error-logs.component.scss',
})
export class ErrorLogsComponent {}
