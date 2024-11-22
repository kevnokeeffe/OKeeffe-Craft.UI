import { Component, Input } from '@angular/core';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
})
export class ProgressSpinnerComponent {
  @Input() color: string = 'primary' as string;
  @Input() mode: ProgressSpinnerMode = 'indeterminate' as ProgressSpinnerMode;
  @Input() strokeWidth: number = 4;
  @Input() diameter: number = 30;
}
