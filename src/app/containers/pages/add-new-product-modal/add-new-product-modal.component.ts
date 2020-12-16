import {Component, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-new-product-modal',
  templateUrl: './add-new-product-modal.component.html',
  styles: []
})
export class AddNewProductModalComponent {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };
  categories = [
    {label: 'Cakes', value: 'chocolate'},
    {label: 'Health and wellness', value: 'health&wellness'}


  ];
  items
  callback

  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  constructor(private modalService: BsModalService) {
  }


  show(): void {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  closeClicked() {
    this.modalRef.hide();
  }
}
