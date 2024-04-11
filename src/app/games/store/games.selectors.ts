import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GamesState } from './games.state';

export const getGameState = createFeatureSelector<GamesState>('games');

export const getSnakeHighScore = createSelector(getGameState, (state) =>
  state && state.snakeHighScore ? state.snakeHighScore : null
);

export const getUpdateSnakeHighScore = createSelector(getGameState, (state) =>
  state && state.updateSnakeHighScore ? state.updateSnakeHighScore : null
);
