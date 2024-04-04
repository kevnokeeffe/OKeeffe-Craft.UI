import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription, combineLatest, take } from 'rxjs';
import { AccountsActions } from '../../store/accounts.actions';
import {
  getAccount,
  getAccountCreated,
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
export class AccountBottomSheetComponent implements OnDestroy, OnInit {
  accountForm: UntypedFormGroup;
  id: string = '';
  loading: boolean = false;
  processing: boolean = false;
  getAccountSubscription: Subscription | undefined;
  getAccountStatusSubscription: Subscription | undefined;
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
  ngOnInit(): void {
    this.getAccountSub();
    this.getAccountStatusSub();
  }

  ngOnDestroy(): void {
    this.getAccountSubscription?.unsubscribe();
    this.getAccountStatusSubscription?.unsubscribe();
    this.store.dispatch(AccountsActions.clearAccount());
  }

  getAccount(id?: string): void {
    this.processing = true;
    if (id) {
      this.getAccountById(id);
      this.id = id;
    } else {
      this.getAccountId();
    }
  }

  getAccountId(): void {
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

  getAccountSub(): void {
    this.getAccountSubscription = this.store
      .select(getAccount)
      .subscribe((account) => {
        if (account) {
          this.accountForm.patchValue(account.data);
          this.processing = false;
        }
      });
  }

  getAccountById(id: string): void {
    this.store.dispatch(AccountsActions.getAccount({ id: id }));
  }

  updateAccount(): void {
    if (this.accountForm.valid && this.accountForm.dirty) {
      this.loading = true;
      this.store.dispatch(
        AccountsActions.updateAccount({
          id: this.id,
          model: this.accountForm.value,
        })
      );
    }
  }

  createAccount(): void {
    if (this.accountForm.valid && this.accountForm.dirty) {
      this.loading = true;
      this.store.dispatch(
        AccountsActions.createAccount({ model: this.accountForm.value })
      );
    }
  }

  getAccountStatusSub(): void {
    this.getAccountStatusSubscription = combineLatest([
      this.store.select(getAccountCreated),
      this.store.select(getAccountUpdated),
    ]).subscribe({
      next: ([created, updated]) => {
        if (created || updated) {
          this.layoutService.showMessage(
            'Account ' + (created ? 'created' : 'updated') + ' successfully',
            'Close'
          );
          this.loading = false;
          this._bottomSheetRef.dismiss();
          this.store.dispatch(AccountsActions.getAccounts());
        }
      },
    });
  }

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss(false);
    event.preventDefault();
  }
}
