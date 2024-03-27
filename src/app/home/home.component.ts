import { Component } from '@angular/core';
import { PlaceholderHomePageComponent } from '../placeholder-home-page/placeholder-home-page.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PlaceholderHomePageComponent, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
