import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomPageComponent } from './add-room-page.component';

describe('AddRoomPageComponent', () => {
  let component: AddRoomPageComponent;
  let fixture: ComponentFixture<AddRoomPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
