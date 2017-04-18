import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewsComponent } from './page-view.component';

describe('PageViewComponent', () => {
  let component: PageViewsComponent;
  let fixture: ComponentFixture<PageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
