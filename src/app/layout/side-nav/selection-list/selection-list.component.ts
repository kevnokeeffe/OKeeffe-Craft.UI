import { AsyncPipe, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
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
import { getIsAuthenticated } from '../../../authentication/store/authentication.selectors';
import { Observable } from 'rxjs';
import { AuthenticationActions } from '../../../authentication/store/authentication.actions';
import { ReusableBottomSheetComponent } from '../../reusable-bottom-sheet/reusable-bottom-sheet.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { AccountBottomSheetComponent } from '../../../accounts/account-bottom-sheet/account-bottom-sheet.component';

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
  ],
  templateUrl: './selection-list.component.html',
  styleUrl: './selection-list.component.scss',
})
export class SelectionListComponent {
  faGithub: IconDefinition = faGithub;
  isTooltipVisible: boolean = true; // replace with your actual condition
  isAuthenticated$: Observable<boolean> | undefined;

  constructor(private _bottomSheet: MatBottomSheet, private store: Store<any>) {
    this.isAuthenticated$ = this.store.select(getIsAuthenticated);
  }

  public navigateToGithub(item: string = 'api' || 'ui'): void {
    if (item === 'api')
      window.open('https://github.com/kevnokeeffe/OKeeffe-Craft.Api', '_blank');
    if (item === 'ui')
      window.open('https://github.com/kevnokeeffe/OKeeffe-Craft.UI', '_blank');
    else return;
  }

  public getTooltipText(): string {
    return this.isTooltipVisible
      ? 'You need to be logged in to use this feature'
      : '';
  }

  public openLoginBottomSheet(): void {
    this._bottomSheet.open(LoginBottomSheetComponent);
  }

  public openRegisterBottomSheet(): void {
    this._bottomSheet.open(RegisterBottomSheetComponent);
  }

  public logout() {
    this.store.dispatch(AuthenticationActions.logout({ authenticated: false }));
  }

  public openAccount() {
    this._bottomSheet.open(AccountBottomSheetComponent);
  }
}
