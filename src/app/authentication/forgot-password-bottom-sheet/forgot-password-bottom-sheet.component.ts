import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { AuthenticationActions } from '../store/authentication.actions';
import { getForgotPasswordResponse } from '../store/authentication.selectors';
import { LayoutService } from '../../layout/layout.service';
import { Subscription } from 'rxjs';

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
export class ForgotPasswordBottomSheetComponent implements OnDestroy, OnInit {
  forgotPasswordForm: UntypedFormGroup;
  loading: boolean = false;
  getForgotPasswordResponseSubscription: Subscription | undefined;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ForgotPasswordBottomSheetComponent>,
    private _bottomSheet: MatBottomSheet,
    private store: Store<any>,
    private layoutService: LayoutService
  ) {
    this.forgotPasswordForm = new UntypedFormGroup({
      email: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.email,
        Validators.required,
      ]),
    });
    this.store.dispatch(AuthenticationActions.clearForgotPasswordResponse());
  }

  ngOnInit(): void {
    this.getPasswordResetResponse();
  }

  ngOnDestroy(): void {
    if (this.getForgotPasswordResponseSubscription) {
      this.getForgotPasswordResponseSubscription.unsubscribe();
    }
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

  getPasswordResetResponse(): void {
    this.getForgotPasswordResponseSubscription = this.store
      .select(getForgotPasswordResponse)
      .subscribe({
        next: (response) => {
          if (response) {
            this.loading = false;
            this.forgotPasswordForm.enable();
            this._bottomSheetRef.dismiss();
            this.layoutService.showMessage(response.message);
          }
        },
        error: (error) => {
          this.loading = false;
          this.forgotPasswordForm.enable();
          this.layoutService.showErrorMessage(error.message);
        },
      });
  }

  sendForgotPasswordEmail(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.forgotPasswordForm.disable();
    this.store.dispatch(
      AuthenticationActions.forgotPassword({
        model: { email: this.forgotPasswordForm.value.email },
      })
    );
  }
}
