import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ViewportAnimationDirective } from '../directives/viewport-animation.directive';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle, ViewportAnimationDirective, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
