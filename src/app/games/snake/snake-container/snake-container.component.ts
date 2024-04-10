import { Component } from '@angular/core';
import { SnakeComponent } from '../snake.component';

@Component({
  selector: 'app-snake-container',
  standalone: true,
  imports: [SnakeComponent],
  templateUrl: './snake-container.component.html',
  styleUrl: './snake-container.component.scss',
})
export class SnakeContainerComponent {}
