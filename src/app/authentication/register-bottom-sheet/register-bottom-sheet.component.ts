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

@Component({
  selector: 'app-register-bottom-sheet',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    MatButtonModule,
    FormFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './register-bottom-sheet.component.html',
  styleUrl: './register-bottom-sheet.component.scss',
})
export class RegisterBottomSheetComponent {
  registerForm: UntypedFormGroup;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RegisterBottomSheetComponent>,
    private _bottomSheet: MatBottomSheet
  ) {
    this.registerForm = new UntypedFormGroup(
      {
        fullName: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.required,
        ]),
        email: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.email,
          Validators.required,
        ]),
        password: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new UntypedFormControl(
          { value: '', disabled: false },
          [Validators.required, Validators.minLength(6)]
        ),
        acceptTerms: new UntypedFormControl({ value: '', disabled: false }, [
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
}
