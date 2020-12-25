import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublishSettingModalComponent } from './edit-publish-setting-modal.component';

describe('EditPublishSettingModalComponent', () => {
  let component: EditPublishSettingModalComponent;
  let fixture: ComponentFixture<EditPublishSettingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPublishSettingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPublishSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
