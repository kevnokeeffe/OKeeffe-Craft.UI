import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pcp-assistant',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './pcp-assistant.component.html',
  styleUrl: './pcp-assistant.component.scss',
})
export class PcpAssistantComponent {
  constructor(private dialog: MatDialogRef<PcpAssistantComponent>) {
    this.dialog.disableClose = true;
  }
}
