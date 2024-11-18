import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { ConfigurationService } from './configuration/store/configuration.service';
import { Store } from '@ngrx/store';
import { getConfigurationLoaded } from './configuration/store/configuration.selectors';
import { AuthenticationActions } from './authentication/store/authentication.actions';
import { Utils } from './utilities/utils';
import {
  EMPTY,
  Subscription,
  filter,
  interval,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { getWeatherForecastSuccess } from './authentication/store/authentication.selectors';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private getConfigurationLoadedSubscription: Subscription | undefined;
  private getWeatherForecastSuccessSubscription: Subscription | undefined;
  private getAuthErrorSubscription: Subscription | undefined;
  constructor(
    private configurationService: ConfigurationService,
    private store: Store<any>,
    private meta: Meta,
    private title: Title
  ) {
    this.loadConfigurationActions();
    this.title.setTitle("Kevin O'Keeffe");
    this.meta.addTags([
      {
        name: 'description',
        content:
          "Kevin O'Keeffe is a dynamic software engineer based in Waterford, Ireland, with a passion for crafting innovative solutions. With expertise in Angular and .Net Core, Kevin thrives in the fast-paced world of full-stack development. His commitment to excellence is evident in his ability to tackle complex challenges and deliver high-quality software products. A dedicated team player, Kevin collaborates seamlessly with colleagues to bring ideas to life and drive impactful results. Outside of coding, Kevin is an avid learner, constantly seeking to expand his skills and stay at the forefront of technology trends. With his blend of technical prowess and creative problem-solving, Kevin O'Keeffe is a valuable asset to any software development team.",
      },
      {
        name: 'keywords',
        content:
          'Waterford, Waterford Tech, Angular Developer, Web Developer, Kevin O Keeffe, Waterford Tech, Angular Developer, Dot Net Core, .Net Core, C#, Full Stack Engineer, Irish Tech, Software Developer, Web Development, Coding Life, Tech Community, Irish Coder, Software Engineering, Kevin O Keeffe, Waterford Developer, Code Wizard, Problem Solver, Tech Enthusiast, Team Player, Innovative Coder, Debugging Expert, Continuous Learner',
      },
      { name: 'author', content: "Kevin O'Keeffe" },
      { rel: 'canonical', href: 'https://kevokeeffe.ie' },
      {
        name: 'og:title',
        content:
          "Kevin O'Keeffe - Waterford Software Engineer | Angular & .Net Core Expert",
      },
      {
        name: 'og:description',
        content:
          "Meet Kevin O'Keeffe, a skilled software engineer based in Waterford, Ireland. With expertise in Angular and .Net Core, Kevin excels in full-stack development, crafting innovative solutions and driving impactful results. Join him on his journey through the world of technology and innovation.",
      },
      { name: 'og:image', content: 'https://kevokeeffe.ie/logo.png' },
      { name: 'og:url', content: '' },
      { name: 'og:type', content: 'website' },
      { name: 'og:locale', content: 'en_IE' },
      // { name: 'fb:app_id', content: '' },
      // { name: 'fb:pages', content: '' },
      // { name: 'instagram:creator', content: '' },
    ]);
  }

  private loadConfigurationActions(): void {
    this.configurationService.initialLoad();
    this.getConfigurationLoadedSubscription = this.store
      .select(getConfigurationLoaded)
      .subscribe({
        next: (loaded) => {
          if (loaded) {
            this.getWeatherforcast();
          }
        },
      });
  }

  private getWeatherforcast(): void {
    const tenMinutes = 300000; // 5 minutes in milliseconds
    const intervalCount = 3000; // 3 seconds in milliseconds
  
    // Create an observable that completes after 5 minutes
    const stopAfterTenMinutes$ = timer(tenMinutes);
  
    this.getWeatherForecastSuccessSubscription = interval(intervalCount).pipe(
      switchMap(() => this.store.select(getWeatherForecastSuccess).pipe(take(1))),
      tap((success) => {
        if (success) {
          this.store.dispatch(AuthenticationActions.refreshToken());
        } else {
          this.store.dispatch(AuthenticationActions.weatherForcast());
        }
      }),
      takeUntil(stopAfterTenMinutes$),
      takeUntil(this.store.select(getWeatherForecastSuccess).pipe(filter((success) => success)))
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.getConfigurationLoadedSubscription) {
      Utils.Unsubscribe(this.getConfigurationLoadedSubscription);
    }
    if (this.getWeatherForecastSuccessSubscription) {
      Utils.Unsubscribe(this.getWeatherForecastSuccessSubscription);
    }
    if (this.getAuthErrorSubscription) {
      Utils.Unsubscribe(this.getAuthErrorSubscription);
    }
  }
}
