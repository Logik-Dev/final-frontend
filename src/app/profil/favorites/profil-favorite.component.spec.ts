import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilFavoriteComponent } from './profil-favorite.component';

describe('ProfilFavoriteComponent', () => {
  let component: ProfilFavoriteComponent;
  let fixture: ComponentFixture<ProfilFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
