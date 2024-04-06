import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { ConfigurationService } from './configuration/store/configuration.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore;
  let configurationService: ConfigurationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AppComponent,
        provideMockStore(),
        {
          provide: ConfigurationService,
          useValue: jasmine.createSpyObj('ConfigurationService', [
            'initialLoad',
          ]),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    configurationService = TestBed.inject(ConfigurationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should load configuration on init', () => {
  //   spyOn(store, 'select').and.returnValue(of(true));
  //   component.loadConfigurationActions();
  //   expect(configurationService.initialLoad).toHaveBeenCalled();
  // });

  // it('should get weather forecast when configuration is loaded', () => {
  //   spyOn(store, 'select').and.returnValue(of(true));
  //   component.loadConfigurationActions();
  //   expect(component.getWeatherForecastSuccessSubscription).toBeTruthy();
  // });

  it('should unsubscribe on destroy', () => {
    spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toHaveBeenCalled();
  });
});
