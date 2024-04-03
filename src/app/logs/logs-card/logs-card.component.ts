import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LogsTabGroupComponent } from '../logs-tab-group/logs-tab-group.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivityLogModel } from '../models/activity-log.model';
import { ErrorLogModel } from '../models/error-log.model';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-logs-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    LogsTabGroupComponent,
    MatIconModule,
    MatTooltipModule,
    MatProgressBar,
  ],
  templateUrl: './logs-card.component.html',
  styleUrl: './logs-card.component.scss',
})
export class LogsCardComponent {
  @Input() loading: boolean = false;
  @Input() activityLogs: ActivityLogModel[] | null | undefined;
  @Input() errorLogs: ErrorLogModel[] | null | undefined;
}
