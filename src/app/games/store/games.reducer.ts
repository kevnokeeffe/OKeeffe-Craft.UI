import { createReducer, on } from '@ngrx/store';
import { GamesActions } from './games.actions';
import { initialGamesState } from './games.state';

export const gamesReducer = createReducer(
  initialGamesState,
  on(GamesActions.getSnakeHighScore, (state) => state),
  on(GamesActions.getSnakeHighScoreSuccess, (state, { payload }) => ({
    ...state,
    snakeHighScore: payload,
  })),
  on(GamesActions.getSnakeHighScoreFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(GamesActions.updateSnakeHighScore, (state) => state),
  on(GamesActions.updateSnakeHighScoreSuccess, (state, { payload }) => ({
    ...state,
    snakeHighScore: payload,
  })),
  on(GamesActions.updateSnakeHighScoreFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(GamesActions.clearErrors, (state) => ({
    ...state,
    error: null,
  })),
  on(GamesActions.clearAll, (state) => initialGamesState)
);
