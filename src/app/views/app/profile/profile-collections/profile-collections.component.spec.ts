import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCollectionsComponent } from './profile-collections.component';

describe('ProfileCollectionsComponent', () => {
  let component: ProfileCollectionsComponent;
  let fixture: ComponentFixture<ProfileCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
