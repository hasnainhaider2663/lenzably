import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInnerComponent } from './profile-inner.component';

describe('ProfileInnerComponent', () => {
  let component: ProfileInnerComponent;
  let fixture: ComponentFixture<ProfileInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
