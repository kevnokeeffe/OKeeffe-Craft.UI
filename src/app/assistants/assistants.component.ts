import { Component } from '@angular/core';
import { AssistantEuRegCardComponent } from './assistant-eu-reg-card/assistant-eu-reg-card.component';
import { AssistantPcpCardComponent } from './assistant-pcp-card/assistant-pcp-card.component';
import { FadeInDirective } from '../directives/fade-in.directive';
import { ViewportAnimationDirective } from '../directives/viewport-animation.directive';

@Component({
  selector: 'app-assistants',
  standalone: true,
  imports: [
    AssistantPcpCardComponent,
    AssistantEuRegCardComponent,
    ViewportAnimationDirective,
    FadeInDirective,
  ],
  templateUrl: './assistants.component.html',
  styleUrl: './assistants.component.scss',
})
export class AssistantsComponent {}
