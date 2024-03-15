import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { PlaceholderHomePageComponent } from './placeholder-home-page/placeholder-home-page.component';
import { MatButton } from '@angular/material/button'; // Add this import statement
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PlaceholderHomePageComponent,
    MatButton,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
