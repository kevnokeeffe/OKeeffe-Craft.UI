import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { FormFieldComponent } from '../../layout/form-field/form-field.component';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RegisterBottomSheetComponent } from '../register-bottom-sheet/register-bottom-sheet.component';
import { ForgotPasswordBottomSheetComponent } from '../forgot-password-bottom-sheet/forgot-password-bottom-sheet.component';

@Component({
  selector: 'app-login-bottom-sheet',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    FormFieldComponent,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login-bottom-sheet.component.html',
  styleUrl: './login-bottom-sheet.component.scss',
})
export class LoginBottomSheetComponent {
  loginForm: UntypedFormGroup;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<LoginBottomSheetComponent>,
    private _bottomSheet: MatBottomSheet
  ) {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.email,
        Validators.required,
      ]),
      password: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
    });
  }

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  openRegisterBottomSheet(): void {
    this._bottomSheetRef.dismiss();
    this._bottomSheet.open(RegisterBottomSheetComponent);
  }
  openForgotPasswordBottomSheet(): void {
    this._bottomSheetRef.dismiss();
    this._bottomSheet.open(ForgotPasswordBottomSheetComponent);
  }
}
