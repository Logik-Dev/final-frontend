import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRoomPageComponent } from './search-room-page.component';

describe('SearchRoomPageComponent', () => {
  let component: SearchRoomPageComponent;
  let fixture: ComponentFixture<SearchRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchRoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
