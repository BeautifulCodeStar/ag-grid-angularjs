import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthGridApplicationComponent } from './fifth-grid-application.component';

describe('FifthGridApplicationComponent', () => {
  let component: FifthGridApplicationComponent;
  let fixture: ComponentFixture<FifthGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifthGridApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifthGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
