import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AsyncPipe, NgStyle } from '@angular/common';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SignatureComponent } from '../images/signature/signature.component';
import { Observable, map, take } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChatBotDialogComponent } from '../../chat-gpt/chat-bot-dialog/chat-bot-dialog.component';
import { Store } from '@ngrx/store';
import { getIsAdmin } from '../../authentication/store/authentication.selectors';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    NgStyle,
    ToolbarComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    SelectionListComponent,
    SignatureComponent,
    AsyncPipe,
    MatMenuModule,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  isSmallScreen$: Observable<boolean> | undefined;
  isAdmin$: Observable<boolean> | undefined;
  chatBotDialogRef: MatDialogRef<ChatBotDialogComponent> | null = null;
  isChatBotDialogOpen: boolean = false;
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  position: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private store: Store
  ) {
    this.isSmallScreen$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(
        map((result) => {
          if (result.matches) {
            this.position = {
              bottom: '80px',
              right: '40px',
            };
          } else {
            this.position = {
              bottom: '100px',
              right: '70px',
            };
          }
          return result.matches;
        })
      );

    this.isAdmin$ = this.store.select(getIsAdmin);
  }

  toggleChatBotDialog() {
    if (this.chatBotDialogRef) {
      this.chatBotDialogRef.close();
      this.chatBotDialogRef = null;
      this.isChatBotDialogOpen = false;
    } else {
      this.chatBotDialogRef = this.dialog.open(ChatBotDialogComponent, {
        hasBackdrop: false,
        disableClose: true,
        position: this.position,
      });
      this.isChatBotDialogOpen = true;
    }
  }

  public onSidenavContentClick(): void {
    if (this.drawer && this.drawer.opened) {
      this.isSmallScreen$?.pipe(take(1)).subscribe({
        next: (isSmallScreen) => {
          if (isSmallScreen && this.drawer) {
            this.drawer.close();
          }
        },
      });
    }
  }
}
