import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LogsTabGroupComponent } from '../logs-tab-group/logs-tab-group.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-logs-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    LogsTabGroupComponent,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './logs-card.component.html',
  styleUrl: './logs-card.component.scss',
})
export class LogsCardComponent {}
