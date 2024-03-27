import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account-bottom-sheet',
  standalone: true,
  imports: [MatBottomSheetModule, MatButtonModule],
  templateUrl: './account-bottom-sheet.component.html',
  styleUrl: './account-bottom-sheet.component.scss',
})
export class AccountBottomSheetComponent {
  accountForm: UntypedFormGroup;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<AccountBottomSheetComponent>
  ) {
    this.accountForm = new UntypedFormGroup({
      email: new UntypedFormControl({ value: '', disabled: false }, [
        Validators.email,
      ]),
    });
  }

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
