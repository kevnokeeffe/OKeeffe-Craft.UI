import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityLogsTableComponent } from './activity-logs-table.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Utils } from '../../../utilities/utils';
import { ActivityLogModel } from '../../models/activity-log.model';

describe('ActivityLogsTableComponent', () => {
  let component: ActivityLogsTableComponent;
  let fixture: ComponentFixture<ActivityLogsTableComponent>;
  let dialog: MatDialog;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityLogsTableComponent],
      providers: [
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('MatDialog', ['open']),
        },
        { provide: Store, useValue: jasmine.createSpyObj('Store', ['select']) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityLogsTableComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mask string', () => {
    const str = 'test';
    const maskedStr = Utils.maskString(str);

    expect(component.maskString(str)).toEqual(maskedStr);
  });

  it('should open log details', () => {
    const log: ActivityLogModel = {
      id: '1',
      logDate: new Date(),
      identifierType: 'type',
      identifier: 'identifier',
      logDetails: 'details',
    };
    component.openLogDetails(log);

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should populate table', () => {
    const logs: any[] = [
      /* Mock logs data */
    ];
    component.populateTable(logs);

    expect(component.dataSource.data).toEqual(logs);
  });

  it('should subscribe to store', () => {
    spyOn(store, 'select').and.returnValue(of(true));
    component.ngOnInit();

    expect(store.select).toHaveBeenCalled();
  });
});
