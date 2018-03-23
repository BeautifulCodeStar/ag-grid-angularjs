import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdGridApplicationComponent } from './third-grid-application.component';

describe('ThirdGridApplicationComponent', () => {
  let component: ThirdGridApplicationComponent;
  let fixture: ComponentFixture<ThirdGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdGridApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
