import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-error',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  templateUrl: './snackbar-error.component.html',
  styleUrl: './snackbar-error.component.scss',
})
export class SnackbarErrorComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; action: string }
  ) {}
  snackBarRef = inject(MatSnackBarRef);
}
