import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivityLogModel } from '../../models/activity-log.model';
import { DescriptionValueComponent } from '../../../layout/description-value/description-value.component';

@Component({
  selector: 'app-activity-log-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DescriptionValueComponent],
  templateUrl: './activity-log-details-dialog.component.html',
  styleUrl: './activity-log-details-dialog.component.scss',
})
export class ActivityLogDetailsDialogComponent {
  constructor(
    private dialog: MatDialogRef<ActivityLogDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ActivityLogModel
  ) {}
}
