import { Component } from '@angular/core';
import { LogsCardComponent } from '../logs-card/logs-card.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [LogsCardComponent],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent {}
