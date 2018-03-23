import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGridApplicationComponent } from './my-grid-application.component';

describe('MyGridApplicationComponent', () => {
  let component: MyGridApplicationComponent;
  let fixture: ComponentFixture<MyGridApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGridApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGridApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
