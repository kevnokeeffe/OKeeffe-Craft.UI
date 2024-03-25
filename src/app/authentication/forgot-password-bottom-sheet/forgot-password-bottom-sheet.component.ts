import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forgot-password-bottom-sheet',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './forgot-password-bottom-sheet.component.html',
  styleUrl: './forgot-password-bottom-sheet.component.scss',
})
export class ForgotPasswordBottomSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ForgotPasswordBottomSheetComponent>
  ) {}

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
