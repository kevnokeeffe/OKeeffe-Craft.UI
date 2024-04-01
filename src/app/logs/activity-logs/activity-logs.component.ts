import { Component } from '@angular/core';
import { ActivityLogsTableComponent } from './activity-logs-table/activity-logs-table.component';

@Component({
  selector: 'app-activity-logs',
  standalone: true,
  imports: [ActivityLogsTableComponent],
  templateUrl: './activity-logs.component.html',
  styleUrl: './activity-logs.component.scss',
})
export class ActivityLogsComponent {}
