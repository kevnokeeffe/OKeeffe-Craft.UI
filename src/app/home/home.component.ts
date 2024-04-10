import { Component } from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { ViewportAnimationDirective } from '../directives/viewport-animation.directive';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { SnakeComponent } from '../games/snake/snake.component';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgStyle,
    ViewportAnimationDirective,
    AboutComponent,
    FooterComponent,
    SnakeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private breakpointObserver: BreakpointObserver) {
    // this.showGame$ = this.breakpointObserver
    //   .observe(Breakpoints.Large && Breakpoints.XLarge && Breakpoints.Medium)
    //   .pipe(map((result) => result.matches));
  }
  playGame: boolean = false;
  //showGame$: Observable<boolean>;
}
