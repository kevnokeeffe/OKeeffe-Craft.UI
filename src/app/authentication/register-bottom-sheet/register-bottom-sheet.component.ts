import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Store } from '@ngrx/store';
import { AuthenticationActions } from '../store/authentication.actions';
import { getRegistrationResponse } from '../store/authentication.selectors';
import { LayoutService } from '../../layout/layout.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
export class RegisterBottomSheetComponent implements OnDestroy, OnInit {
  registerForm: UntypedFormGroup;
  loading: boolean = false;
  getRegistrationSuccessSubscription: Subscription | undefined;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RegisterBottomSheetComponent>,
    private _bottomSheet: MatBottomSheet,
    private store: Store<any>,
    private layoutService: LayoutService,
    private router: Router
  ) {
    this.registerForm = new UntypedFormGroup(
      {
        fullName: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.required,
        ]),
        email: new UntypedFormControl(
          {
            value: '',
            disabled: false,
          },
          [Validators.email, Validators.required]
        ),
        password: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new UntypedFormControl(
          { value: '', disabled: false },
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

  ngOnInit(): void {
    this.getRegSuccessSub();
  }

  ngOnDestroy(): void {
    if (this.getRegistrationSuccessSubscription) {
      this.getRegistrationSuccessSubscription.unsubscribe();
    }
    this.store.dispatch(AuthenticationActions.clearRegResponse());
  }

  private getRegSuccessSub(): void {
    this.getRegistrationSuccessSubscription = this.store
      .select(getRegistrationResponse)
      .subscribe({
        next: (response) => {
          if (response) {
            this.handleRegistrationResponse(response);
          }
        },
      });
  }

  private handleRegistrationResponse(response: any): void {
    if (response.success === true) {
      this.loading = false;
      this.registerForm.enable();
      this._bottomSheetRef.dismiss();
      this.layoutService.closeDrawer();
      this.layoutService.showMessage(
        'Thank you for registering! Your account setup is complete. Please check your email for confirmation.',
        'Close'
      );
      this.router.navigate(['/']);
    } else if (response.success === false) {
      this.loading = false;
      this.registerForm.enable();
      this.layoutService.showMessage(
        response.message ||
          'An error occurred while registering your account. Please try again.',
        'Close'
      );
    }
  }

  public submit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.registerForm.disable();
    this.store.dispatch(
      AuthenticationActions.register(this.registerForm.value)
    );
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
