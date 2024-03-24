import { Component } from '@angular/core';
import { PlaceholderHomePageComponent } from '../placeholder-home-page/placeholder-home-page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlaceholderHomePageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
