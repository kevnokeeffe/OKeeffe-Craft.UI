import { Injectable, OnDestroy } from '@angular/core';
import { GamesDataService } from './games.data-service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiClient } from '../../utilities/api-client';

@Injectable({
  providedIn: 'root',
})
export class GamesService extends GamesDataService implements OnDestroy {
  constructor(
    protected override api: ApiClient,
    protected override store: Store<any>,
    protected override route: Router
  ) {
    super(api, store, route);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
