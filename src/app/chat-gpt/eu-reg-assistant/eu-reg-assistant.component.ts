import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-eu-reg-assistant',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './eu-reg-assistant.component.html',
  styleUrl: './eu-reg-assistant.component.scss',
})
export class EuRegAssistantComponent {
  constructor(private dialog: MatDialogRef<EuRegAssistantComponent>) {
    this.dialog.disableClose = true;
  }
}
