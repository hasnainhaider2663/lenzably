import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCollectionsItemsComponent } from './profile-collections-items.component';

describe('ProfileCollectionsItemsComponent', () => {
  let component: ProfileCollectionsItemsComponent;
  let fixture: ComponentFixture<ProfileCollectionsItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCollectionsItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCollectionsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
