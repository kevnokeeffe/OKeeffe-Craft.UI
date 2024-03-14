import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaceholderHomePageComponent } from './placeholder-home-page/placeholder-home-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlaceholderHomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
