import { Component } from '@angular/core';
import { AssistantPcpCardComponent } from '../layout/card/assistant-pcp-card/assistant-pcp-card.component';
import { AssistantEuRegCardComponent } from '../layout/card/assistant-eu-reg-card/assistant-eu-reg-card.component';

@Component({
  selector: 'app-assistants',
  standalone: true,
  imports: [AssistantPcpCardComponent, AssistantEuRegCardComponent],
  templateUrl: './assistants.component.html',
  styleUrl: './assistants.component.scss',
})
export class AssistantsComponent {}
