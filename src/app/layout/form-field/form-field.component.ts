import { Component, Input } from '@angular/core';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgStyle,
    NgFor,
    JsonPipe,
    NgIf,
    MatDivider,
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
})
export class FormFieldComponent {
  @Input() label: string = 'Form Field';
  @Input() control: UntypedFormControl | AbstractControl | any;
  @Input() placeholder: string = 'Enter your text';
  @Input() type: string = 'text';
  @Input() value: string | undefined;
  @Input() required: boolean = false;
  @Input() errors: any | undefined;
  @Input() errorMessage: string | undefined;
  @Input() hint: string | undefined;
  @Input() appearance: MatFormFieldAppearance =
    'outline' || 'fill' || 'standard';
  @Input() prefixIcon: string | undefined;
  @Input() suffixIcon: string | undefined;
  @Input() showPasswordVisibility: boolean = false;
  @Input() autocomplete: boolean = true;

  hide: boolean = true;

  toggleVisibility() {
    this.hide = !this.hide;
  }

  getErrors() {
    let errorMessages = [];
    if (this.control && this.control.errors) {
      for (let propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          this.control.touched
        ) {
          errorMessages.push(this.errors[propertyName]);
        }
      }
    }
    return errorMessages;
  }
}
