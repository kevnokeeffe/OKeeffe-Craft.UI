import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivityLogsComponent } from '../activity-logs/activity-logs.component';
import { ErrorLogsComponent } from '../error-logs/error-logs.component';
import { ActivityLogModel } from '../models/activity-log.model';
import { ErrorLogModel } from '../models/error-log.model';

@Component({
  selector: 'app-logs-tab-group',
  standalone: true,
  imports: [MatTabsModule, ActivityLogsComponent, ErrorLogsComponent],
  templateUrl: './logs-tab-group.component.html',
  styleUrl: './logs-tab-group.component.scss',
})
export class LogsTabGroupComponent {
  @Input() activityLogs: ActivityLogModel[] | null | undefined;
  @Input() errorLogs: ErrorLogModel[] | null | undefined;
}
