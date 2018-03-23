import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthGridApplicationComponent } from './sixth-grid-application.component';

describe('SixthGridApplicationComponent', () => {
  let component: SixthGridApplicationComponent;
  let fixture: ComponentFixture<SixthGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixthGridApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixthGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
