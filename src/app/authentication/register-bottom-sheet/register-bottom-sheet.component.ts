import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldComponent } from '../../layout/form-field/form-field.component';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { LoginBottomSheetComponent } from '../login-bottom-sheet/login-bottom-sheet.component';
import { Utils } from '../../utilities/utils';
import { ProgressBarComponent } from '../../layout/progress-bar/progress-bar.component';
import { SlideToggleComponent } from '../../layout/slide-toggle/slide-toggle.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-register-bottom-sheet',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    MatButtonModule,
    FormFieldComponent,
    ReactiveFormsModule,
    ProgressBarComponent,
    SlideToggleComponent,
    NgStyle,
  ],
  templateUrl: './register-bottom-sheet.component.html',
  styleUrl: './register-bottom-sheet.component.scss',
})
export class RegisterBottomSheetComponent {
  registerForm: UntypedFormGroup;
  loading: boolean = false;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RegisterBottomSheetComponent>,
    private _bottomSheet: MatBottomSheet
  ) {
    this.registerForm = new UntypedFormGroup(
      {
        fullName: new UntypedFormControl(
          { value: "Kevin O'Keeffe", disabled: false },
          [Validators.required]
        ),
        email: new UntypedFormControl(
          {
            value: this.getRandomSixDigitNumber() + '@test.com',
            disabled: false,
          },
          [Validators.email, Validators.required]
        ),
        password: new UntypedFormControl({ value: '123456', disabled: false }, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new UntypedFormControl(
          { value: '123456', disabled: false },
          [Validators.required, Validators.minLength(6)]
        ),
        acceptTerms: new UntypedFormControl({ value: true, disabled: false }, [
          Validators.requiredTrue,
        ]),
      },
      {
        validators: [(group: any) => Utils.passwordMatchValidator(group)],
      } as any
    );
  }

  public submit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.registerForm.disable();
    console.log(this.registerForm.value);
  }

  public openLoginBottomSheet(): void {
    this._bottomSheetRef.dismiss();
    this._bottomSheet.open(LoginBottomSheetComponent);
  }

  public closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  private getRandomSixDigitNumber(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
