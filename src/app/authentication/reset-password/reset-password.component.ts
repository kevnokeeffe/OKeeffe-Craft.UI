import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LayoutService } from '../../layout/layout.service';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../../utilities/utils';
import { AuthenticationActions } from '../store/authentication.actions';
import { ResetPasswordRequestModel } from '../models/reset-password-request.model';
import { TokenStatus } from '../models/token-status.enum';
import { FormFieldComponent } from '../../layout/form-field/form-field.component';
import { MatButtonModule } from '@angular/material/button';
import { ProgressBarComponent } from '../../layout/progress-bar/progress-bar.component';
import { getResetPasswordResponse } from '../store/authentication.selectors';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LoginBottomSheetComponent } from '../login-bottom-sheet/login-bottom-sheet.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    FormFieldComponent,
    MatButtonModule,
    ReactiveFormsModule,
    ProgressBarComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  form: UntypedFormGroup | undefined;
  loading: boolean = false;
  validated: boolean = false;
  token: string | undefined;
  getResetPasswordResponseSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>,
    private layoutService: LayoutService,
    private bottomSheet: MatBottomSheet
  ) {
    this.createFormGroup();
  }

  ngOnDestroy(): void {
    if (this.getResetPasswordResponseSubscription) {
      this.getResetPasswordResponseSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });
    if (!this.token) {
      this.tokenStatus = TokenStatus.Invalid;
      this.router.navigate(['/']);
      return;
    } else this.getResetPasswordResponse();
  }

  submit(): void {
    if (this.validated) {
      this.bottomSheet.open(LoginBottomSheetComponent);
      return;
    }
    if (this.form?.invalid) {
      return;
    }
    const model: ResetPasswordRequestModel = {
      token: this.token!,
      password: this.form?.get('password')?.value,
      confirmPassword: this.form?.get('confirmPassword')?.value,
    };
    this.form?.disable();
    this.loading = true;
    this.store.dispatch(AuthenticationActions.resetPassword({ model }));
  }

  getResetPasswordResponse(): void {
    this.getResetPasswordResponseSubscription = this.store
      .select(getResetPasswordResponse)
      .subscribe({
        next: (response) => {
          if (response) {
            this.validated = response.success;
            this.loading = false;
            this.form?.enable();
            this.layoutService.showMessage(response.message);
          }
        },
        error: () => {
          this.loading = false;
          this.form?.enable();
        },
      });
  }

  createFormGroup(): void {
    this.form = new UntypedFormGroup(
      {
        password: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new UntypedFormControl(
          { value: '', disabled: false },
          [Validators.required, Validators.minLength(6)]
        ),
      },
      {
        validators: [(group: any) => Utils.passwordMatchValidator(group)],
      } as any
    );
  }
}
