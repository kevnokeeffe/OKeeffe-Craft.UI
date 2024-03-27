import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reusable-bottom-sheet',
  standalone: true,
  imports: [MatBottomSheetModule, MatButtonModule],
  templateUrl: './reusable-bottom-sheet.component.html',
  styleUrl: './reusable-bottom-sheet.component.scss',
})
export class ReusableBottomSheetComponent {
  contentPortal: ComponentPortal<any> | undefined;
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ReusableBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}
  public closeBottomSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  someMethod() {
    // Call a method on the passed in component
    this.data.componentInstance.someMethod();
  }
}
