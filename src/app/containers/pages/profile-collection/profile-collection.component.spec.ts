import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCollectionComponent } from './profile-collection.component';

describe('ProfileCollectionComponent', () => {
  let component: ProfileCollectionComponent;
  let fixture: ComponentFixture<ProfileCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
