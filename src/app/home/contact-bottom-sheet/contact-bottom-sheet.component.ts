import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldComponent } from '../../layout/form-field/form-field.component';
import { ProgressBarComponent } from '../../layout/progress-bar/progress-bar.component';
import { LayoutService } from '../../layout/layout.service';
import { Store } from '@ngrx/store';
import { AccountsActions } from '../../accounts/store/accounts.actions';
import { getContactMessage } from '../../accounts/store/accounts.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-bottom-sheet',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    MatButtonModule,
    FormFieldComponent,
    ReactiveFormsModule,
    ProgressBarComponent,
  ],
  templateUrl: './contact-bottom-sheet.component.html',
  styleUrl: './contact-bottom-sheet.component.scss',
})
export class ContactBottomSheetComponent implements OnDestroy, OnInit {
  contactForm: UntypedFormGroup;
  loading: boolean = false;
  getContactMessageSubscription: Subscription | undefined;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ContactBottomSheetComponent>,
    private layoutService: LayoutService,
    private store: Store<any>
  ) {
    this.contactForm = new UntypedFormGroup({
      email: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.email,
        Validators.required,
      ]),
      subject: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      message: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
    });
  }

  ngOnInit(): void {
    this.getContactMessageSubscription = this.store
      .select(getContactMessage)
      .subscribe({
        next: (contactMessage) => {
          if (contactMessage) {
            if (contactMessage.success === true) {
              this.loading = false;
              this._bottomSheetRef.dismiss();
              this.layoutService.showMessage(contactMessage.message);
            } else if (contactMessage.success === false) {
              this.loading = false;
              this.layoutService.showMessage(contactMessage.message);
            }
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.getContactMessageSubscription?.unsubscribe();
    this.store.dispatch(AccountsActions.clearContactMessage());
  }

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  submit(): void {
    if (this.contactForm.valid) {
      this.loading = true;
      this.store.dispatch(
        AccountsActions.createContactMessage({ model: this.contactForm.value })
      );
    }
  }
}
