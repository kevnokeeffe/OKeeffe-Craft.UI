import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivityLogsComponent } from '../activity-logs/activity-logs.component';
import { ErrorLogsComponent } from '../error-logs/error-logs.component';

@Component({
  selector: 'app-logs-tab-group',
  standalone: true,
  imports: [MatTabsModule, ActivityLogsComponent, ErrorLogsComponent],
  templateUrl: './logs-tab-group.component.html',
  styleUrl: './logs-tab-group.component.scss',
})
export class LogsTabGroupComponent {}
