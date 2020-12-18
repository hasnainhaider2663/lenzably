import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FirebaseAssetService} from '../../../../firebase-asset.service';

@Component({
  selector: 'app-edit-folder-name-modal',
  templateUrl: './edit-folder-name-modal.component.html',
  styleUrls: ['./edit-folder-name-modal.component.scss']
})
export class EditFolderNameModalComponent {
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
  showSuccess;
  error;
  @ViewChild('template', {static: true}) template: TemplateRef<any>;
  folder = {};
  tags;
  category;

  constructor(private modalService: BsModalService, private assetService: FirebaseAssetService, private fb: FormBuilder) {
  }

  show(): void {
    this.error = false;
    this.form = this.fb.group({
       name: [this.inputText, [Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z ]*')]],
      description: [this.inputText, [Validators.required, Validators.minLength(10)]]
    });
    this.modalRef = this.modalService.show(this.template, this.config);

  }

  addTagFn(addedName): { name: any; tag: true } {
    return addedName;
  }

  closeClicked() {
    this.modalRef.hide();
  }

  async submit() {
    if (this.form.controls.name.status === 'INVALID') {
      this.error = 'Name is not valid';
      return;
    }
    if (this.form.controls.description.status === 'INVALID') {
      this.error = 'Description is not valid';
      return;
    }
    this.items.forEach(async x => {
      await this.assetService.updateDocument(x.md5Hash, {tags: this.tags});
    });
    if (this.tags.length < 3 || this.tags.filter(x => x.length < 3).length > 0) {
      this.error = 'Please enter at least 3 tags, each 3 or more characters';
      return;
    }
    if (!this.category){
      this.error = 'Category is required';
    }
    if (this.form.invalid) {
      this.error = true;
      return;
    }
    this.error = false;
    await this.assetService.updateBatch(this.items, {name: this.form.value.name});
    this.showSuccess = true;
  }

  onChange(event) {
    this.showSuccess = false;
    this.error = undefined;
  }
}

