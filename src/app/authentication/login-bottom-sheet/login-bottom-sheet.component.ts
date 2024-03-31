import { Component, Inject, OnDestroy } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
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
import { getAuthenticationResponse } from '../store/authentication.selectors';
import { Subscription } from 'rxjs';
import { Utils } from '../../utilities/utils';
import { ProgressBarComponent } from '../../layout/progress-bar/progress-bar.component';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';

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
    private _store: Store<any>,
    private router: Router,
    private layoutService: LayoutService,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { email?: string }
  ) {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(
        {
          value: this.data?.email ? this.data?.email : 'kevokeeffe@gmail.com',
          disabled: false,
        },
        [Validators.email, Validators.required]
      ),
      password: new UntypedFormControl(
        {
          value: '123456',
          disabled: false,
        },
        [Validators.required]
      ),
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
      .select(getAuthenticationResponse)
      .pipe()
      .subscribe({
        next: (response) => {
          if (response) {
            this.loading = false;
            this.loginForm.enable();
            if (response.success) {
              this._bottomSheetRef.dismiss();
              this.router.navigate(['/dashboard']);
            } else {
              this.layoutService.showErrorMessage(response.message);
              this._bottomSheetRef.dismiss();
            }
          }
        },
        error: (error) => {
          this.loading = false;
          this.layoutService.showErrorMessage(error.message);
          this.loginForm.enable();
        },
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
