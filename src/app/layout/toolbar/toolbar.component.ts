import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignatureComponent } from '../images/signature/signature.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getWeatherForecastSuccess } from '../../authentication/store/authentication.selectors';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconButton,
    MatIcon,
    NgStyle,
    SignatureComponent,
    AsyncPipe,
    MatTooltipModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  @Input() drawer: MatDrawer | undefined;
  weatherForcast$: Observable<boolean> | undefined;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getWeatherForcast();
  }

  toggleDrawer(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  getWeatherForcast(): void {
    this.weatherForcast$ = this.store.select(getWeatherForecastSuccess);
  }
}
