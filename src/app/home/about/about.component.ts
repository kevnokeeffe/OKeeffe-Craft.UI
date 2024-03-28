import { Component } from '@angular/core';
import { ViewportAnimationDirective } from '../../directives/viewport-animation.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ViewportAnimationDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
