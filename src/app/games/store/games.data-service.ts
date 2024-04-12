import { Subject, takeUntil } from 'rxjs';
import { GamesEndpointsModel } from '../../configuration/models/configuration.settings.model';
import { getGamesEndpoints } from '../../configuration/store/configuration.selectors';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiClient } from '../../utilities/api-client';

export class GamesDataService {
  protected gamesEndpoints: GamesEndpointsModel | null = null;
  public destroy$ = new Subject<void>();
  constructor(
    protected api: ApiClient,
    protected store: Store<any>,
    protected route: Router
  ) {
    this.store
      .select(getGamesEndpoints)
      .pipe(takeUntil(this.destroy$))
      .subscribe((endpoints) => {
        if (endpoints) {
          this.gamesEndpoints = endpoints;
        }
      });
  }

  public getSnakeHighScore() {
    return this.api.get(`${this.gamesEndpoints?.snake.getSnakeHighScore}`);
  }

  public updateSnakeHighScore(model: any) {
    return this.api.put(
      `${this.gamesEndpoints?.snake.updateSnakeHighScore}`,
      model
    );
  }
}
