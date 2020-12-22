import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LbTagsListComponent } from './lb-tags-list.component';

describe('LbTagsListComponent', () => {
  let component: LbTagsListComponent;
  let fixture: ComponentFixture<LbTagsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LbTagsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LbTagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
