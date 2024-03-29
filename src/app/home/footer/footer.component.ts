import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getWeatherForecastSuccess } from '../../authentication/store/authentication.selectors';
import { ContactBottomSheetComponent } from '../contact-bottom-sheet/contact-bottom-sheet.component';
import { AsyncPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, AsyncPipe, MatTooltipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isApiConnected$: Observable<boolean>;
  constructor(private _bottomSheet: MatBottomSheet, private store: Store<any>) {
    this.isApiConnected$ = this.store.select(getWeatherForecastSuccess);
  }
  openContactBottomSheet(): void {
    this._bottomSheet.open(ContactBottomSheetComponent);
  }
}
