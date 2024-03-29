import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldComponent } from '../../layout/form-field/form-field.component';
import { RegisterBottomSheetComponent } from '../register-bottom-sheet/register-bottom-sheet.component';
import { LoginBottomSheetComponent } from '../login-bottom-sheet/login-bottom-sheet.component';
import { ProgressBarComponent } from '../../layout/progress-bar/progress-bar.component';

@Component({
  selector: 'app-forgot-password-bottom-sheet',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    FormFieldComponent,
    ReactiveFormsModule,
    MatButtonModule,
    ProgressBarComponent,
  ],
  templateUrl: './forgot-password-bottom-sheet.component.html',
  styleUrl: './forgot-password-bottom-sheet.component.scss',
})
export class ForgotPasswordBottomSheetComponent {
  forgotPasswordForm: UntypedFormGroup;
  loading: boolean = false;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ForgotPasswordBottomSheetComponent>,
    private _bottomSheet: MatBottomSheet
  ) {
    this.forgotPasswordForm = new UntypedFormGroup({
      email: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.email,
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
  openLoginBottomSheet(): void {
    this._bottomSheetRef.dismiss();
    this._bottomSheet.open(LoginBottomSheetComponent);
  }

  sendResetPasswordEmail(): void {
    this.loading = true;
    this.forgotPasswordForm.disable();
  }
}
