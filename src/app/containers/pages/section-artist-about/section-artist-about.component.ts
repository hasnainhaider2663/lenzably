import {Component, Input, OnInit} from '@angular/core';
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-section-artist-about',
  templateUrl: './section-artist-about.component.html',
  styleUrls: ['./section-artist-about.component.scss']
})
export class SectionArtistAboutComponent implements OnInit {

  @Input() editMode = false;

  constructor(private lightbox: Lightbox) { }

  ngOnInit(): void {
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }

}
