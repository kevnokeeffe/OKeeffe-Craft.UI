import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-account-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './edit-account-dialog.component.html',
  styleUrl: './edit-account-dialog.component.scss',
})
export class EditAccountDialogComponent {}
