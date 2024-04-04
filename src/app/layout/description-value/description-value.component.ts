import {
  AsyncPipe,
  DatePipe,
  JsonPipe,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-description-value',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    JsonPipe,
    DatePipe,
    AsyncPipe,
    NgStyle,
  ],
  templateUrl: './description-value.component.html',
  styleUrl: './description-value.component.scss',
})
export class DescriptionValueComponent {
  @Input() value: string | Date | number | undefined;
  @Input() label: string = '';

  detectType(value: any): string {
    if (!isNaN(Number(value))) {
      return 'number';
    } else if (!isNaN(Date.parse(value))) {
      return 'date';
    } else if (
      value.toLowerCase() === 'true' ||
      value.toLowerCase() === 'false'
    ) {
      return 'boolean';
    } else if (value.startsWith('{') && value.endsWith('}')) {
      return 'object';
    } else if (value.startsWith('[') && value.endsWith(']')) {
      return 'array';
    }
    return typeof value;
  }
}
