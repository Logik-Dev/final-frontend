import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomListPageComponent } from './room-list-page.component';

describe('RoomListComponent', () => {
  let component: RoomListPageComponent;
  let fixture: ComponentFixture<RoomListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
