import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar'; // Import MatSnackBar instead of MatSnackBarModule
import { SnackbarComponent } from './snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private snackbar: MatSnackBar) {}
  openSnackBar(message: string, action: string) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: { message, action: action },
      duration: 10000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
