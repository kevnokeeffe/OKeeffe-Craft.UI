import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar instead of MatSnackBarModule
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarErrorComponent } from './snackbar/snackbar-error/snackbar-error.component';
import { map, Observable, Subject, take } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private closeDrawerSubject = new Subject<void>();
  closeDrawer$ = this.closeDrawerSubject.asObservable();
  isSmallScreen$: Observable<boolean> | undefined;
  constructor(
    private snackbar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isSmallScreen$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
  }

  showMessage(message: string, action?: string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: { message, action: action },
      duration: 20000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  showErrorMessage(message: string, action?: string) {
    this.snackbar.openFromComponent(SnackbarErrorComponent, {
      data: { message, action: action },
      duration: 30000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  closeDrawer(): void {
    this.isSmallScreen$?.pipe(take(1)).subscribe({
      next: (isSmallScreen) => {
        if (isSmallScreen) {
          this.closeDrawerSubject.next();
        }
      },
    });
  }
}
