import { ServiceResponseModel } from '../../models/service-response.model';
import { SnakeHighScoreModel } from '../models/snake-high-score.model';

export interface GamesState {
  error: any | null;
  snakeHighScore: ServiceResponseModel<SnakeHighScoreModel> | null;
  updateSnakeHighScore: ServiceResponseModel<any> | null;
}

export const initialGamesState: GamesState = {
  error: null,
  snakeHighScore: null,
  updateSnakeHighScore: null,
};
