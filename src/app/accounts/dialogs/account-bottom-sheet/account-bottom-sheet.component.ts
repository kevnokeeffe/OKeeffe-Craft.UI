import { Component, Inject, OnDestroy } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldComponent } from '../../../layout/form-field/form-field.component';
import { Utils } from '../../../utilities/utils';
import { Store } from '@ngrx/store';
import { getAccountId } from '../../../authentication/store/authentication.selectors';
import { Subscription, take } from 'rxjs';
import { AccountsActions } from '../../store/accounts.actions';
import {
  getAccount,
  getAccountCreated,
  getAccountLoaded,
  getAccountUpdated,
} from '../../store/accounts.selectors';
import { LayoutService } from '../../../layout/layout.service';
import { ProgressBarComponent } from '../../../layout/progress-bar/progress-bar.component';

@Component({
  selector: 'app-account-bottom-sheet',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    MatButtonModule,
    FormFieldComponent,
    ReactiveFormsModule,
    ProgressBarComponent,
  ],
  templateUrl: './account-bottom-sheet.component.html',
  styleUrl: './account-bottom-sheet.component.scss',
})
export class AccountBottomSheetComponent implements OnDestroy {
  accountForm: UntypedFormGroup;
  id: string = '';
  loading: boolean = false;
  getAccountUpdatedSubscription: Subscription | undefined;
  getAccountLoadedSubscription: Subscription | undefined;
  getAccountSubscription: Subscription | undefined;

  constructor(
    private store: Store<any>,
    private _bottomSheetRef: MatBottomSheetRef<AccountBottomSheetComponent>,
    private layoutService: LayoutService,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      id: string;
      isCreate: boolean;
      title: string;
      subtitle: string;
    }
  ) {
    this.store.dispatch(AccountsActions.clearAccount());
    this.accountForm = new UntypedFormGroup(
      {
        email: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(6),
          data.isCreate ? Validators.required : Validators.nullValidator,
        ]),
        fullName: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.maxLength(50),
          Validators.minLength(3),
          data.isCreate ? Validators.required : Validators.nullValidator,
        ]),
        password: new UntypedFormControl({ value: '', disabled: false }, [
          Validators.maxLength(50),
          Validators.minLength(6),
          data.isCreate ? Validators.required : Validators.nullValidator,
        ]),
        confirmPassword: new UntypedFormControl(
          { value: '', disabled: false },
          [Validators.maxLength(50), Validators.minLength(6)]
        ),
      },
      {
        validators: [(group: any) => Utils.passwordMatchValidator(group)],
      } as any
    );
    if (!this.data.isCreate) this.getAccount(this.data.id);
  }

  ngOnDestroy(): void {
    this.getAccountUpdatedSubscription?.unsubscribe();
    this.getAccountLoadedSubscription?.unsubscribe();
    this.getAccountSubscription?.unsubscribe();
  }

  getAccount(id?: string): void {
    if (id) {
      this.getAccountById(id);
      this.id = id;
    } else {
      this.store
        .select(getAccountId)
        .pipe(take(1))
        .subscribe((id) => {
          if (id) {
            this.id = id;
            this.getAccountById(id);
          }
        });
    }
  }

  getAccountById(id: string): void {
    this.store.dispatch(AccountsActions.getAccount({ id: id }));
    this.getAccountLoadedSubscription = this.store
      .select(getAccountLoaded)
      .subscribe((loaded) => {
        if (loaded) {
          this.getAccountSubscription = this.store
            .select(getAccount)
            .subscribe((account) => {
              if (account) this.accountForm.patchValue(account);
            });
        }
      });
  }

  updateAccount(event: MouseEvent): void {
    if (this.accountForm.valid && this.accountForm.dirty) {
      this.loading = true;
      this.store.dispatch(
        AccountsActions.updateAccount({
          id: this.id,
          model: this.accountForm.value,
        })
      );
      this.getAccountUpdatedSubscription = this.store
        .select(getAccountUpdated)
        .subscribe({
          next: (updated) => {
            if (updated) {
              this.layoutService.showMessage('Account updated successfully.');
              this._bottomSheetRef.dismiss(true);
              event.preventDefault();
              this.loading = false;
            }
          },
          error: (error) => {
            this.layoutService.showMessage(error);
            this.loading = false;
          },
        });
    }
  }

  createAccount(event: MouseEvent): void {
    this.loading = true;
    this.store.dispatch(
      AccountsActions.createAccount({ model: this.accountForm.value })
    );
    this.store.select(getAccountCreated).subscribe({
      next: (created) => {
        if (created) {
          this.layoutService.showMessage('Account created successfully.');
          this._bottomSheetRef.dismiss(true);
          event.preventDefault();
          this.loading = false;
        }
      },
      error: (error) => {
        this.layoutService.showMessage(error);
        this.loading = false;
      },
    });
  }

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss(false);
    event.preventDefault();
  }
}
