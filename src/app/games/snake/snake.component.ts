import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-snake',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './snake.component.html',
  styleUrl: './snake.component.scss',
})
export class SnakeComponent implements OnInit, AfterViewInit {
  // Define HTML elements
  board: HTMLElement | null | undefined;
  instructionText: HTMLElement | null | undefined;
  logo: HTMLElement | null | undefined;
  score: HTMLElement | null | undefined;
  highScoreText: HTMLElement | null | undefined;

  // Define game variables
  gridSize = 20;
  snake = [{ x: 10, y: 10 }];
  food = this.generateFood();
  highScore = 0;
  direction = 'right';
  gameInterval: any;
  gameSpeedDelay = 200;
  gameStarted = false;

  constructor() {
    window.addEventListener('keydown', function (e) {
      if (
        e.code === 'Space' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        e.preventDefault();
      }
    });
  }

  ngAfterViewInit(): void {
    this.createBoard();
  }

  createBoard() {
    this.board = document.getElementById('game-board');
    this.instructionText = document.getElementById('instruction-text');
    this.logo = document.getElementById('logo');
    this.score = document.getElementById('score');
    this.highScoreText = document.getElementById('highScore');
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.handleKeyPress.bind(this));
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
      // if (index === 0) {
      // snakeElement.style.borderRadius = '25% 50%'; // Make the first snake element round
      // } else {
      snakeElement.style.borderRadius = '50% 25%'; // Make the rest of the snake elements oval
      // }
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

  private startGame() {
    this.gameStarted = true; // Keep track of a running game
    this.instructionText!.style.display = 'none';
    this.logo!.style.display = 'none';
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
    this.instructionText!.style.display = 'block';
    this.logo!.style.display = 'block';
  }

  private updateHighScore() {
    const currentScore = this.snake.length - 1;
    if (currentScore > this.highScore) {
      this.highScore = currentScore;
      this.highScoreText!.textContent = this.highScore
        .toString()
        .padStart(3, '0');
    }
    this.highScoreText!.style.display = 'block';
  }
}
