import {Component, TemplateRef, ViewChild} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FirebaseService} from "../../../firebase.service";

@Component({
  selector: 'app-edit-product-categories-modal',
  templateUrl: './edit-product-categories-modal.component.html',
  styles: []
})
export class EditProductCategoriesModalComponent {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };
  categories = [
    {label: 'Wallpapers', value: 'wallpapers'},
    {label: 'Nature', value: 'nature'},
    {label: 'People', value: 'people'},
    {label: 'Architecture', value: 'architecture'},
    {label: 'Current Events', value: 'current events'},
    {label: 'Experimental', value: 'experimental'},
    {label: 'Fashion', value: 'fashion'},
    {label: 'Film', value: 'film'},
    {label: 'Health and wellness', value: 'healthandwellness'},
    {label: 'Interiors', value: 'interiors'},
    {label: 'Street Photography', value: 'streetphotography'},
    {label: 'Work From Home', value: 'work from home'},
    {label: 'Technology', value: 'technology'},
    {label: 'Travel', value: 'travel'},
    {label: 'Textures and Patterns', value: 'texturesandpatterns'},
    {label: 'Business and Work', value: 'businessandwork'},
    {label: 'COVID-19', value: 'covid19'},
    {label: 'Animals', value: 'animals'},
    {label: 'Food and Drinks', value: 'foodanddrinks'},
    {label: 'Athletics', value: 'athletics'},
    {label: 'Spirituality', value: 'spirituality'},
    {label: 'Food and Drinks', value: 'foodanddrinks'},
    {label: 'Arts and Culture', value: 'artsandculture'},
    {label: 'History', value: 'history'},
    {label: 'Sustainability', value: 'sustainability'},
  ].sort((x, y) => {
    if (x.label.toLowerCase() < y.label.toLowerCase()) {
      return -1;
    } else if (x.label.toLowerCase() > y.label.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  items;
  category;

  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  constructor(private modalService: BsModalService, private firebaseService: FirebaseService) {
  }


  show(): void {
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  closeClicked() {
    this.modalRef.hide();
  }

  async submit() {
    await this.firebaseService.updateBatch(this.items, {category: this.category});
  }
}
