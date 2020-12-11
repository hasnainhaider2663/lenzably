import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCopyComponent } from './home-copy.component';

describe('HomeCopyComponent', () => {
  let component: HomeCopyComponent;
  let fixture: ComponentFixture<HomeCopyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCopyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
