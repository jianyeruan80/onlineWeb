import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondimentsComponent } from './condiments.component';

describe('CondimentsComponent', () => {
  let component: CondimentsComponent;
  let fixture: ComponentFixture<CondimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
