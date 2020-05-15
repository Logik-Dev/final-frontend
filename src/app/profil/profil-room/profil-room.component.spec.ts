import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilRoomComponent } from './profil-room.component';

describe('ProfilRoomComponent', () => {
  let component: ProfilRoomComponent;
  let fixture: ComponentFixture<ProfilRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
