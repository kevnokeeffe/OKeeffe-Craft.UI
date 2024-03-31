import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faGithub } from '@fortawesome/free-brands-svg-icons';
import { LoginBottomSheetComponent } from '../../../authentication/login-bottom-sheet/login-bottom-sheet.component';
import { RegisterBottomSheetComponent } from '../../../authentication/register-bottom-sheet/register-bottom-sheet.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import {
  getIsAuthenticated,
  getWeatherForecastSuccess,
} from '../../../authentication/store/authentication.selectors';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationActions } from '../../../authentication/store/authentication.actions';
import { AccountBottomSheetComponent } from '../../../accounts/account-bottom-sheet/account-bottom-sheet.component';
import { Utils } from '../../../utilities/utils';
import { RouterModule } from '@angular/router';
import { SettingsBottomSheetComponent } from '../../../settings/settings-bottom-sheet/settings-bottom-sheet.component';

@Component({
  selector: 'app-selection-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    NgStyle,
    MatDivider,
    MatMenuModule,
    FaIconComponent,
    MatTooltipModule,
    AsyncPipe,
    RouterModule,
  ],
  templateUrl: './selection-list.component.html',
  styleUrl: './selection-list.component.scss',
})
export class SelectionListComponent implements OnDestroy {
  faGithub: IconDefinition = faGithub;
  isTooltipVisible: boolean = true; // replace with your actual condition
  isAuthenticated: boolean | undefined;
  isApiConnected: boolean | undefined;
  isApiConnectedSubscription: Subscription | undefined;
  isAuthenticatedSubscription: Subscription | undefined;

  constructor(private _bottomSheet: MatBottomSheet, private store: Store<any>) {
    this.isAuthenticatedSubscription = this.store
      .select(getIsAuthenticated)
      .pipe()
      .subscribe({
        next: (value) => {
          this.isAuthenticated = value;
        },
      });
    this.isApiConnectedSubscription = this.store
      .select(getWeatherForecastSuccess)
      .pipe()
      .subscribe({
        next: (value) => {
          this.isApiConnected = value;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.isApiConnectedSubscription) {
      Utils.Unsubscribe(this.isApiConnectedSubscription);
    }
    if (this.isAuthenticatedSubscription) {
      Utils.Unsubscribe(this.isAuthenticatedSubscription);
    }
  }

  public navigateToGithub(item: string = 'api' || 'ui'): void {
    if (item === 'api')
      window.open('https://github.com/kevnokeeffe/OKeeffe-Craft.Api', '_blank');
    if (item === 'ui')
      window.open('https://github.com/kevnokeeffe/OKeeffe-Craft.UI', '_blank');
    else return;
  }

  public getWeatherForecast(): void {
    if (this.isApiConnected) {
      this.store.dispatch(AuthenticationActions.secureWeatherForcast());
    }
  }

  public getTooltipText(
    text?: string,
    isAuthenticated?: boolean | null
  ): string {
    if (text) {
      return text;
    }
    return !isAuthenticated
      ? 'You need to be logged in to use this feature.'
      : '';
  }

  public openLoginBottomSheet(): void {
    this._bottomSheet.open(LoginBottomSheetComponent);
  }

  public openRegisterBottomSheet(): void {
    this._bottomSheet.open(RegisterBottomSheetComponent);
  }

  public openSettingsBottomSheet(): void {
    this._bottomSheet.open(SettingsBottomSheetComponent);
  }

  public logout() {
    this.store.dispatch(AuthenticationActions.logout({ authenticated: false }));
  }

  public openAccountBottomSheet() {
    this._bottomSheet.open(AccountBottomSheetComponent);
  }
}
