import {Component, TemplateRef, ViewChild} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FirebaseAssetService} from "../../../firebase-asset.service";

@Component({
  selector: 'app-product-edit-tags-modal',
  templateUrl: './edit-product-tags-modal.component.html',
  styles: []
})
export class EditProductTagsModalComponent {
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
  ];
  items;
  tags;

  @ViewChild('template', {static: true}) template: TemplateRef<any>;
  error: any;
  success: any;

  constructor(private modalService: BsModalService, private assetService: FirebaseAssetService) {
  }

  addTagFn(addedName): { name: any; tag: true } {
    return addedName;
  }

  show(): void {
    this.error = undefined;
    this.success = undefined;
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  closeClicked() {
    this.modalRef.hide();
  }

  async submit() {
    if (this.tags.length < 3 || this.tags.filter(x => x.length < 3).length > 0) {
      this.error = 'Please enter at least 3 tags, each 3 or more characters';
      return;
    }
    await this.assetService.updateBatch(this.items, {tags: this.tags});
    this.error = undefined;
    this.success = true;
  }
}
