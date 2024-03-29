import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [MatSlideToggleModule, ReactiveFormsModule, NgStyle],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
})
export class SlideToggleComponent {
  @Input() control: UntypedFormControl | any;
  @Input() color: ThemePalette = 'accent';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() labelPosition: 'before' | 'after' = 'after';
  @Input() label: string | null = null;
  @Input() fontSise: string = '1.2em';
}
