import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysDialogComponent } from './days-dialog.component';

describe('DaysDialogComponent', () => {
  let component: DaysDialogComponent;
  let fixture: ComponentFixture<DaysDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
