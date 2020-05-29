import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInfosFormComponent } from './room-infos-form.component';

describe('RoomInfosFormComponent', () => {
  let component: RoomInfosFormComponent;
  let fixture: ComponentFixture<RoomInfosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomInfosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomInfosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
