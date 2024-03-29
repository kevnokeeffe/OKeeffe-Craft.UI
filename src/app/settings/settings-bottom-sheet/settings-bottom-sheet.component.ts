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
  selector: 'app-settings-bottom-sheet',
  standalone: true,
  imports: [MatBottomSheetModule, MatButtonModule],
  templateUrl: './settings-bottom-sheet.component.html',
  styleUrl: './settings-bottom-sheet.component.scss',
})
export class SettingsBottomSheetComponent {
  settingsForm: UntypedFormGroup;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<SettingsBottomSheetComponent>
  ) {
    this.settingsForm = new UntypedFormGroup({
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
