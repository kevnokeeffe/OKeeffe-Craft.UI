import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { Observable, Subscription, combineLatest, map, take } from 'rxjs';
import { Utils } from '../../utilities/utils';
import { ProgressBarComponent } from '../../layout/progress-bar/progress-bar.component';
import { Router } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';
import { getAuthenticationResponse } from '../store/authentication.selectors';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
export class LoginBottomSheetComponent implements OnDestroy, OnInit {
  loginForm: UntypedFormGroup;
  loginSubscription: Subscription | undefined;
  getAuthenticatedMessageSubscription: Subscription | undefined;
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
          value: this.data?.email ? this.data?.email : '',
          disabled: false,
        },
        [Validators.email, Validators.required]
      ),
      password: new UntypedFormControl(
        {
          value: '',
          disabled: false,
        },
        [Validators.required]
      ),
    });
    this._store.dispatch(AuthenticationActions.clearAuthResponse());
  }

  closeDrawer(): void {
          this.layoutService.closeDrawer();
        
  }

  ngOnInit(): void {
    this.getAuthResponse();
  }

  private getAuthResponse(): void {
    this.loginSubscription = this._store
      .select(getAuthenticationResponse)
      .subscribe({
        next: (res) => {
          if (res) {
            this.handleRegistrationResponse(res);
          }
        },
        error: (error) => {
          this.loading = false;
          this.layoutService.showErrorMessage(error.message);
          this.loginForm.enable();
        },
      });
  }

  private handleRegistrationResponse(response: any): void {
    if (response.success === true) {
      this.loading = false;
      this.loginForm.enable();
      this.router.navigate(['/dashboard']);
      this._bottomSheetRef.dismiss();
      this.closeDrawer();
    } else if (response.success === false) {
      this.layoutService.showErrorMessage(response.message);
      this.loading = false;
      this.loginForm.enable();
    }
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
    if (this.getAuthenticatedMessageSubscription)
      Utils.Unsubscribe(this.getAuthenticatedMessageSubscription);
  }
}
