import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFolderNameModalComponent } from './edit-folder-name-modal.component';

describe('EditFolderNameModalComponent', () => {
  let component: EditFolderNameModalComponent;
  let fixture: ComponentFixture<EditFolderNameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFolderNameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFolderNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
