import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UpdateSnakeHighScoreModel } from '../models/update-snake-high-score.model';
import { ServiceResponseModel } from '../../models/service-response.model';
import { SnakeHighScoreModel } from '../models/snake-high-score.model';

export const GamesActions = createActionGroup({
  source: 'games',
  events: {
    getSnakeHighScore: props<{ id: string }>(),
    getSnakeHighScoreSuccess: props<{
      payload: ServiceResponseModel<SnakeHighScoreModel>;
    }>(),
    getSnakeHighScoreFailure: props<{ error: any }>(),
    updateSnakeHighScore: props<{
      id: string;
      model: UpdateSnakeHighScoreModel;
    }>(),
    updateSnakeHighScoreSuccess: props<{
      payload: ServiceResponseModel<any>;
    }>(),
    updateSnakeHighScoreFailure: props<{ error: any }>(),
    clearErrors: emptyProps(),
    clearAll: emptyProps(),
  },
});
