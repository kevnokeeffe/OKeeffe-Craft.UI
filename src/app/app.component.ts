import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlaceholderHomePageComponent } from './placeholder-home-page/placeholder-home-page.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ConfigurationService } from './configuration/store/configuration.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlaceholderHomePageComponent, LayoutComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private configurationService: ConfigurationService) {
    console.log('AppComponent.constructor');
    this.configurationService.initialLoad();
  }
}
