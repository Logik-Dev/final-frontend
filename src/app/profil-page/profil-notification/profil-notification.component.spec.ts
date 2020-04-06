import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilNotificationComponent } from './profil-notification.component';

describe('ProfilNotificationComponent', () => {
  let component: ProfilNotificationComponent;
  let fixture: ComponentFixture<ProfilNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
