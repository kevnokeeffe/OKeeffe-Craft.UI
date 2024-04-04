import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ViewportAnimationDirective } from '../directives/viewport-animation.directive';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle,
    ViewportAnimationDirective,
    AboutComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isImageLoaded = false;

  imageLoaded() {
    this.isImageLoaded = true;
  }
}
