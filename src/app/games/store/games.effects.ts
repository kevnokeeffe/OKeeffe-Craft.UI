import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GamesService } from './games.service';
import { GamesActions } from './games.actions';
import { exhaustMap, map, catchError, of } from 'rxjs';

@Injectable()
export class GamesEffects {
  constructor(private actions$: Actions, private gamesService: GamesService) {}

  // Add effects here
  getSnakeHighScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GamesActions.getSnakeHighScore),
      exhaustMap((model) =>
        this.gamesService.getSnakeHighScore(model.id).pipe(
          map((payload) => ({
            type: GamesActions.getSnakeHighScoreSuccess.type, // Fix: Use the 'type' property of the action
            payload: payload,
          })),
          catchError(() =>
            of({
              type: GamesActions.getSnakeHighScoreFailure.type,
            })
          )
        )
      )
    )
  );

  updateSnakeHighScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GamesActions.updateSnakeHighScore),
      exhaustMap((model) =>
        this.gamesService.updateSnakeHighScore(model.id, model.model).pipe(
          map((payload) => ({
            type: GamesActions.updateSnakeHighScoreSuccess.type, // Fix: Use the 'type' property of the action
            payload: payload,
          })),
          catchError(() =>
            of({
              type: GamesActions.updateSnakeHighScoreFailure.type,
            })
          )
        )
      )
    )
  );
}
