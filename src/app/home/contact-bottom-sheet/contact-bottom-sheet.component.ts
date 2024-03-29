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
  selector: 'app-contact-bottom-sheet',
  standalone: true,
  imports: [MatBottomSheetModule, MatButtonModule],
  templateUrl: './contact-bottom-sheet.component.html',
  styleUrl: './contact-bottom-sheet.component.scss',
})
export class ContactBottomSheetComponent {
  contactForm: UntypedFormGroup;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ContactBottomSheetComponent>
  ) {
    this.contactForm = new UntypedFormGroup({
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
