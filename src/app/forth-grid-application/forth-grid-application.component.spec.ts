import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForthGridApplicationComponent } from './forth-grid-application.component';

describe('ForthGridApplicationComponent', () => {
  let component: ForthGridApplicationComponent;
  let fixture: ComponentFixture<ForthGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForthGridApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForthGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
