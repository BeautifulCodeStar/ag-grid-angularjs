import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondGridApplicationComponent } from './second-grid-application.component';

describe('SecondGridApplicationComponent', () => {
  let component: SecondGridApplicationComponent;
  let fixture: ComponentFixture<SecondGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondGridApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
