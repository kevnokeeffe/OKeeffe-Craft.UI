import { Component, Inject } from '@angular/core';
import { EmailModel } from '../../models/email.model';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DescriptionValueComponent } from '../../../layout/description-value/description-value.component';

@Component({
  selector: 'app-email-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DescriptionValueComponent],
  templateUrl: './email-details-dialog.component.html',
  styleUrl: './email-details-dialog.component.scss',
})
export class EmailDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmailModel
  ) {}
}
