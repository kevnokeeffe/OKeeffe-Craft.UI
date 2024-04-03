import { Component, Input } from '@angular/core';
import { ActivityLogsTableComponent } from './activity-logs-table/activity-logs-table.component';
import { ActivityLogModel } from '../models/activity-log.model';

@Component({
  selector: 'app-activity-logs',
  standalone: true,
  imports: [ActivityLogsTableComponent],
  templateUrl: './activity-logs.component.html',
  styleUrl: './activity-logs.component.scss',
})
export class ActivityLogsComponent {
  @Input() activityLogs: ActivityLogModel[] | null | undefined;
}
