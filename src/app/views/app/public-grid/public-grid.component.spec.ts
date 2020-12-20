import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicGridComponent } from './public-grid.component';

describe('PublicGridComponent', () => {
  let component: PublicGridComponent;
  let fixture: ComponentFixture<PublicGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
