import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBookingComponent } from './profil-booking.component';

describe('ProfilBookingComponent', () => {
  let component: ProfilBookingComponent;
  let fixture: ComponentFixture<ProfilBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
