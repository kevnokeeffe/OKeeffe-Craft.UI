import { NgStyle } from '@angular/common';
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
  ],
  templateUrl: './selection-list.component.html',
  styleUrl: './selection-list.component.scss',
})
export class SelectionListComponent {
  faGithub: IconDefinition = faGithub;
  isTooltipVisible: boolean = true; // replace with your actual condition

  constructor(private _bottomSheet: MatBottomSheet) {}

  navigateToGithub() {
    window.open('https://github.com/kevnokeeffe', '_blank');
  }

  getTooltipText() {
    return this.isTooltipVisible
      ? 'You need to be logged in to use this feature'
      : '';
  }

  openLoginBottomSheet(): void {
    this._bottomSheet.open(LoginBottomSheetComponent);
  }

  openRegisterBottomSheet(): void {
    this._bottomSheet.open(RegisterBottomSheetComponent);
  }
}
