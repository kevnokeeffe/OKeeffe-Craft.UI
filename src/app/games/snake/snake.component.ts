import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable, Subscription, map } from 'rxjs';
import { getSnakeHighScore } from '../store/games.selectors';
import { ServiceResponseModel } from '../../models/service-response.model';
import { SnakeHighScoreModel } from '../models/snake-high-score.model';
import { GamesActions } from '../store/games.actions';
import { FormFieldComponent } from '../../layout/form-field/form-field.component';
import { UntypedFormControl, Validators } from '@angular/forms';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [MatIcon, AsyncPipe, MatButtonModule, NgClass, FormFieldComponent],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss',
})
export class SnakeComponent implements OnInit, AfterViewInit, OnDestroy {
  nameControl = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20),
  ]);
  board: HTMLElement | null | undefined;
  instructionText: HTMLElement | null | undefined;
  logo: HTMLElement | null | undefined;
  score: HTMLElement | null | undefined;
  isSmallScreen$: Observable<boolean> | undefined;
  gridSize = 20;
  snake = [{ x: 10, y: 10 }];
  food = this.generateFood();
  highScore: string = '0';
  direction = 'right';
  gameInterval: any;
  gameSpeedDelay = 200;
  gameStarted = false;
  highScoreData: ServiceResponseModel<SnakeHighScoreModel> | undefined;
  getSnakeHighScoreSub: Subscription | undefined;
  isScoreHigher: boolean = false;
  highScoreName: string = '';
  private keydownHandler: ((event: KeyboardEvent) => void) | undefined;
  private boundHandleKeyPress:
    | ((event: { code: string; key: string }) => void)
    | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<any>,
    private layoutService: LayoutService
  ) {
    this.isSmallScreen$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));
    this.preventDefaultKeydowns();
    this.getHighScoreData();
  }

  private getHighScoreData(): void {
    this.getSnakeHighScoreSub = this.store.select(getSnakeHighScore).subscribe({
      next: (highScoreData) => {
        if (highScoreData?.success === true) {
          this.highScoreName = highScoreData.data.playerName || '';
          this.highScore = highScoreData.data.score;
          this.nameControl.setValue(this.highScoreName);
        }
      },
    });
  }

  private preventDefaultKeydowns(): void {
    this.keydownHandler = (event) => {
      if (
        event.code === 'Space' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight'
      ) {
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', this.keydownHandler);
  }

  ngAfterViewInit(): void {
    this.createBoard();
  }

  ngOnDestroy() {
    this.removeListeners();
    if (this.getSnakeHighScoreSub) {
      this.getSnakeHighScoreSub.unsubscribe();
    }
  }

  removeListeners(): void {
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
    }
    if (this.boundHandleKeyPress) {
      document.removeEventListener('keydown', this.boundHandleKeyPress);
    }
  }

  createBoard() {
    this.board = document.getElementById('game-board');
    this.instructionText = document.getElementById('instruction-text');
    this.logo = document.getElementById('logo');
    this.score = document.getElementById('score');
  }

  ngOnInit(): void {
    this.initKeydownListener();
    this.store.dispatch(GamesActions.getSnakeHighScore());
  }

  private initKeydownListener(): void {
    this.boundHandleKeyPress = this.handleKeyPress.bind(this);
    document.addEventListener('keydown', this.boundHandleKeyPress);
  }

  private handleKeyPress(event: { code: string; key: string }) {
    if (
      (!this.gameStarted && event.code === 'Space') ||
      (!this.gameStarted && event.key === ' ')
    ) {
      this.startGame();
    } else {
      switch (event.key) {
        case 'ArrowUp':
          this.direction = 'up';
          break;
        case 'ArrowDown':
          this.direction = 'down';
          break;
        case 'ArrowLeft':
          this.direction = 'left';
          break;
        case 'ArrowRight':
          this.direction = 'right';
          break;
      }
    }
  }

  selectDirection(direction: string) {
    this.direction = direction;
  }

  spaceBarBtn() {
    this.startGame();
  }

  private draw() {
    this.board!.innerHTML = '';
    this.drawSnake();
    this.drawFood();
    this.updateScore();
  }

  private drawSnake() {
    this.snake.forEach((segment, index) => {
      const snakeElement = this.createGameElement('div', 'snake');
      this.setPosition(snakeElement, segment);
      snakeElement.style.border = '#5a5a5a 1px dotted';
      snakeElement.style.backgroundColor = '#414141';
      snakeElement.style.borderRadius = '50% 25%'; // Make the rest of the snake elements oval
      this.board!.appendChild(snakeElement);
    });
  }

  private setPosition(element: HTMLElement, position: { x: any; y: any }) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
  }

  private drawFood() {
    if (this.gameStarted) {
      const foodElement = this.createGameElement('div', 'food');
      this.setPosition(foodElement, this.food);
      foodElement.style.border = '#999 5px solid';
      foodElement.style.backgroundColor = '#dedede';
      foodElement.style.borderRadius = '50%';
      this.board!.appendChild(foodElement);
    }
  }

  private createGameElement(tag: string, className: string) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }

  private startGame() {
    this.gameStarted = true; // Keep track of a running game
    this.gameInterval = setInterval(() => {
      this.move();
      this.checkCollision();
      this.draw();
    }, this.gameSpeedDelay);
  }

  private generateFood() {
    const x = Math.floor(Math.random() * this.gridSize) + 1;
    const y = Math.floor(Math.random() * this.gridSize) + 1;
    return { x, y };
  }

  private move() {
    const head = { ...this.snake[0] };
    switch (this.direction) {
      case 'up':
        head.y--;
        break;
      case 'down':
        head.y++;
        break;
      case 'left':
        head.x--;
        break;
      case 'right':
        head.x++;
        break;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.food = this.generateFood();
      this.increaseSpeed();
      clearInterval(this.gameInterval); // Clear past interval
      this.gameInterval = setInterval(() => {
        this.move();
        this.checkCollision();
        this.draw();
      }, this.gameSpeedDelay);
    } else {
      this.snake.pop();
    }
  }

  private increaseSpeed() {
    if (this.gameSpeedDelay > 150) {
      this.gameSpeedDelay -= 5;
    } else if (this.gameSpeedDelay > 100) {
      this.gameSpeedDelay -= 3;
    } else if (this.gameSpeedDelay > 50) {
      this.gameSpeedDelay -= 2;
    } else if (this.gameSpeedDelay > 25) {
      this.gameSpeedDelay -= 1;
    }
  }

  private checkCollision() {
    const head = this.snake[0];

    if (
      head.x < 1 ||
      head.x > this.gridSize ||
      head.y < 1 ||
      head.y > this.gridSize
    ) {
      this.resetGame();
    }

    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.resetGame();
      }
    }
  }

  private resetGame() {
    this.updateHighScore();
    this.stopGame();
    this.snake = [{ x: 10, y: 10 }];
    this.food = this.generateFood();
    this.direction = 'right';
    this.gameSpeedDelay = 200;
    this.updateScore();
  }

  private updateScore() {
    const currentScore = this.snake.length - 1;
    this.score!.textContent = currentScore.toString().padStart(3, '0');
  }

  private stopGame() {
    clearInterval(this.gameInterval);
    this.gameStarted = false;
  }

  private updateHighScore() {
    const currentScore = this.snake.length - 1;
    const highScore = Number(this.highScore);
    if (currentScore > highScore) {
      this.isScoreHigher = true;
      this.removeListeners();
    } else {
      this.isScoreHigher = false;
    }
    if (currentScore > highScore) {
      this.highScore = String(currentScore);
      this.store.dispatch(
        GamesActions.updateSnakeHighScore({
          model: { score: this.highScore, playerName: this.nameControl.value },
        })
      );
    }
  }

  submitName() {
    if (this.nameControl.invalid) {
      return;
    }
    this.store.dispatch(
      GamesActions.updateSnakeHighScore({
        model: { score: this.highScore, playerName: this.nameControl.value },
      })
    );
    this.layoutService.showMessage('High score saved!', 'Close');
    this.isScoreHigher = false;
    this.preventDefaultKeydowns();
    this.initKeydownListener();
  }
}
