import {Component, Input, OnInit} from '@angular/core';
import {Lightbox} from "ngx-lightbox";
import {ModalInnerComponent} from "../../ui/modals/modal-component/modal-inner-component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {ModalEditProfileComponent} from "../../ui/modals/modal-edit-profile/modal-edit-profile.component";

@Component({
  selector: 'app-section-artist-about',
  templateUrl: './section-artist-about.component.html',
  styleUrls: ['./section-artist-about.component.scss']
})
export class SectionArtistAboutComponent implements OnInit {

  @Input() editMode = false;
  bsModalRef: BsModalRef;

  constructor(private lightbox: Lightbox, private modalService: BsModalService, private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  openLightbox(src: string): void {
    this.lightbox.open([{ src, thumb: '' }], 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true });
  }

  openModalWithComponent(): void {
    const initialState = {
      title: this.translateService.instant('modal.edit-profile')
    };
    this.bsModalRef = this.modalService.show(ModalEditProfileComponent, { initialState });
    this.bsModalRef.content.closeBtnName = this.translateService.instant('modal.close');
  }
}
