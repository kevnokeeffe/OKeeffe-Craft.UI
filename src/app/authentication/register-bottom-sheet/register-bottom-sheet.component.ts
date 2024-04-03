import { Component, OnDestroy } from '@angular/core';
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
import { getRegistrationSuccess } from '../store/authentication.selectors';
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
export class RegisterBottomSheetComponent implements OnDestroy {
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
  ngOnDestroy(): void {
    if (this.getRegistrationSuccessSubscription) {
      this.getRegistrationSuccessSubscription.unsubscribe();
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
    this.getRegistrationSuccessSubscription = this.store
      .select(getRegistrationSuccess)
      .subscribe({
        next: (success) => {
          if (success) {
            this.loading = false;
            this.registerForm.enable();
            this._bottomSheetRef.dismiss();
            this.layoutService.showMessage(
              'Thank you for registering! Your account setup is complete. Please check your email for confirmation.',
              'Close'
            );
            this.router.navigate(['/']);
          }
        },
      });
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
