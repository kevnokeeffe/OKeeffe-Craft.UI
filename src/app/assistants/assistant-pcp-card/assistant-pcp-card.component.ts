import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PcpAssistantComponent } from '../../chat-gpt/pcp-assistant/pcp-assistant.component';

@Component({
  selector: 'app-assistant-pcp-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './assistant-pcp-card.component.html',
  styleUrl: './assistant-pcp-card.component.scss',
})
export class AssistantPcpCardComponent {
  constructor(private dialog: MatDialog) {}
  openAssistant() {
    this.dialog.open(PcpAssistantComponent);
  }
}
