import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat-bot-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDivider,
    RouterModule,
  ],
  templateUrl: './chat-bot-dialog.component.html',
  styleUrl: './chat-bot-dialog.component.scss',
})
export class ChatBotDialogComponent {
  title: string = 'Hi there! How can I help you today?';

  home(): void {
    this.title = 'Hi there! How can I help you today?';
  }
  messages(): void {
    this.title = 'Messages';
  }
  help(): void {
    this.title = 'Help';
  }
}
