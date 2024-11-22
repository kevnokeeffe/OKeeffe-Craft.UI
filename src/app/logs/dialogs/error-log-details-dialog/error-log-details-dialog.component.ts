import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ErrorLogModel } from '../../models/error-log.model';
import { DescriptionValueComponent } from '../../../layout/description-value/description-value.component';

@Component({
  selector: 'app-error-log-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DescriptionValueComponent],
  templateUrl: './error-log-details-dialog.component.html',
  styleUrl: './error-log-details-dialog.component.scss',
})
export class ErrorLogDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ErrorLogModel
  ) {}
}
