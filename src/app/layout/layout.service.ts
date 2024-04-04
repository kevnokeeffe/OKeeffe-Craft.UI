import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar instead of MatSnackBarModule
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarErrorComponent } from './snackbar/snackbar-error/snackbar-error.component';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private snackbar: MatSnackBar) {}
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
}
