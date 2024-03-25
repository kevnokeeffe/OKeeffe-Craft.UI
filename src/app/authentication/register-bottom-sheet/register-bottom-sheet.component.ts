import { Component } from '@angular/core';
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register-bottom-sheet',
  standalone: true,
  imports: [MatBottomSheetModule, MatButtonModule],
  templateUrl: './register-bottom-sheet.component.html',
  styleUrl: './register-bottom-sheet.component.scss',
})
export class RegisterBottomSheetComponent {
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<RegisterBottomSheetComponent>
  ) {}

  closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
