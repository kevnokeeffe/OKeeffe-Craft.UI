import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { EuRegAssistantComponent } from '../../chat-gpt/eu-reg-assistant/eu-reg-assistant.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-assistant-eu-reg-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIcon,
  ],
  templateUrl: './assistant-eu-reg-card.component.html',
  styleUrl: './assistant-eu-reg-card.component.scss',
})
export class AssistantEuRegCardComponent {
  constructor(private dialog: MatDialog) {}
  openAssistant() {
    this.dialog.open(EuRegAssistantComponent);
  }
}
