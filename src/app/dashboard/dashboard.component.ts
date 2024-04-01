import { Component } from '@angular/core';
import { AccountsComponent } from '../accounts/accounts/accounts.component';
import { LogsComponent } from '../logs/logs/logs.component';
import { ViewportAnimationDirective } from '../directives/viewport-animation.directive';
import { FadeInDirective } from '../directives/fade-in.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AccountsComponent,
    LogsComponent,
    ViewportAnimationDirective,
    FadeInDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
