import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-progress-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgStyle],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
})
export class ProgressSpinnerComponent {
  @Input() color: string = 'primary' || 'accent' || 'warn';
  @Input() mode: ProgressSpinnerMode = 'indeterminate' || 'determinate';
  @Input() strokeWidth: number = 4;
  @Input() diameter: number = 30;
}
