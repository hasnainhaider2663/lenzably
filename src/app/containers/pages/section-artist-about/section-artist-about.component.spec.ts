import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionArtistAboutComponent } from './section-artist-about.component';

describe('SectionArtistAboutComponent', () => {
  let component: SectionArtistAboutComponent;
  let fixture: ComponentFixture<SectionArtistAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionArtistAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionArtistAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
