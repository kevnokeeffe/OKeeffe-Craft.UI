import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButton, MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { AsyncPipe, NgStyle } from '@angular/common';
import { SelectionListComponent } from './selection-list/selection-list.component';
import { SignatureComponent } from '../images/signature/signature.component';
import { Observable, map } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    MatButton,
    SelectionListComponent,
    SignatureComponent,
    AsyncPipe,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  isSmallScreen$: Observable<boolean> | undefined;
  @ViewChild('drawer') drawer: MatDrawer | undefined;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isSmallScreen$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
  }
}
