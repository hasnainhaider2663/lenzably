import {Component, TemplateRef, ViewChild} from "@angular/core";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FirebaseAssetService} from "../../../firebase-asset.service";
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-product-description-modal',
  templateUrl: './edit-product-description-modal.component.html',
  styles: []
})
export class EditProductDescriptionModalComponent {
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
  inputText = '';
  form;
  showError;
  showSuccess;


  @ViewChild('template', {static: true}) template: TemplateRef<any>;

  constructor(private modalService: BsModalService, private assetService: FirebaseAssetService, private fb: FormBuilder ) {
  }


  show(): void {
    this.form = this.fb.group({
      description: [this.inputText, [Validators.required, Validators.minLength(10), Validators.pattern('[a-zA-Z0-9 ]*')]]
    });
    this.modalRef = this.modalService.show(this.template, this.config);
  }

  closeClicked() {
    this.modalRef.hide();
  }

  async submit() {
    this.showSuccess = false;
    if (this.form.invalid) {
      this.showError = true;
      return;
    }
    this.showError = false;
    await this.assetService.updateBatch(this.items, {description: this.form.value.description});
    this.showSuccess = true;
  }
  onChange(event) {
    this.showSuccess =  false;
    const val = event.target.value;
    if (val.length >= 8) {
      this.showError = false;
    }
  }
}

