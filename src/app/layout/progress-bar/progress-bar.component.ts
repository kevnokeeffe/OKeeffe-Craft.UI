import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  MatProgressBarModule,
  ProgressBarMode,
} from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [MatProgressBarModule, NgStyle],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() color: string = 'accent';
  @Input() marginTop: string = '-4px';
  @Input() mode: ProgressBarMode = 'indeterminate';
}
