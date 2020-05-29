import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeDialogComponent } from './event-type-dialog.component';

describe('EventTypeDialogComponent', () => {
  let component: EventTypeDialogComponent;
  let fixture: ComponentFixture<EventTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
