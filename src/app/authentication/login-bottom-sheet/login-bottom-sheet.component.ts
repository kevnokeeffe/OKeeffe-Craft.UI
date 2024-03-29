import { Component, OnDestroy } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { AuthenticationActions } from '../store/authentication.actions';
import { AuthenticateRequestModel } from '../models/authentication-request.model';
import { getAuthenticationSuccess } from '../store/authentication.selectors';
import { Subscription } from 'rxjs';
import { Utils } from '../../utilities/utils';
import { ProgressBarComponent } from '../../layout/progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from '../../layout/progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-login-bottom-sheet',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    FormFieldComponent,
    ReactiveFormsModule,
    MatButtonModule,
    ProgressBarComponent,
  ],
  templateUrl: './login-bottom-sheet.component.html',
  styleUrl: './login-bottom-sheet.component.scss',
})
export class LoginBottomSheetComponent implements OnDestroy {
  loginForm: UntypedFormGroup;
  loginSubscription: Subscription | undefined;
  loading: boolean = false;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<LoginBottomSheetComponent>,
    private _bottomSheet: MatBottomSheet,
    private _store: Store<any>
  ) {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(
        { value: 'kevokeeffe@gmail.com', disabled: false },
        [Validators.email, Validators.required]
      ),
      password: new UntypedFormControl({ value: '123456', disabled: false }, [
        Validators.required,
      ]),
    });
  }

  public closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public authenticate(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const emailValue = this.loginForm.get('email')?.value;
    const passwordValue = this.loginForm.get('password')?.value;
    if (emailValue === null || passwordValue === null) {
      return;
    }
    this.loading = true;
    this.loginForm.disable();
    const authenticate: AuthenticateRequestModel = {
      email: emailValue,
      password: passwordValue,
    };
    this._store.dispatch(AuthenticationActions.authenticate({ authenticate }));
    this.loginSubscription = this._store
      .select(getAuthenticationSuccess)
      .pipe()
      .subscribe((success) => {
        if (success) {
          this._bottomSheetRef.dismiss();
          this.loading = false;
          this.loginForm.enable();
        }
      });
  }

  public openRegisterBottomSheet(): void {
    this._bottomSheetRef.dismiss();
    this._bottomSheet.open(RegisterBottomSheetComponent);
  }

  public openForgotPasswordBottomSheet(): void {
    this._bottomSheetRef.dismiss();
    this._bottomSheet.open(ForgotPasswordBottomSheetComponent);
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) Utils.Unsubscribe(this.loginSubscription);
  }
}
