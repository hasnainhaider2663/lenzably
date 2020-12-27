import {Component, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FirebaseService} from '../../../../firebase.service';

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
  categories = ([
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
  ]).sort((x, y) => {
    if (x.label.toLowerCase() < y.label.toLowerCase()) {
      return -1;
    } else if (x.label.toLowerCase() > y.label.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  form;
  showSuccess;
  error;
  @ViewChild('template', {static: true}) template: TemplateRef<any>;
  collection = {name: '', description: '', tags: [], category: {label: '', value: ''}, updatedAt: new Date()};
  tags;
  category;

  constructor(private modalService: BsModalService, private firebaseService: FirebaseService, private fb: FormBuilder) {
  }

  show(): void {
    this.error = false;
    this.form = this.fb.group({
      name: [this.collection.name || '', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z\' ]*')]],
      description: [this.collection.description || '', [Validators.required, Validators.minLength(10)]]
    });

    this.tags = this.collection.tags;
    this.category = this.collection.category;

    this.modalRef = this.modalService.show(this.template, this.config);

  }

  resetCollection() {
    this.collection = {name: '', description: '', tags: [], category: {label: '', value: ''}, updatedAt: new Date()};
  }

  addTagFn(addedName): { name: any; tag: true } {
    return addedName;
  }

  closeClicked() {
    this.modalRef.hide();
  }

  async submit() {
    const myCollection = Object.assign({}, this.collection);
    if (this.form.controls.name.status === 'INVALID') {
      this.error = 'Name is not valid';
      return;
    }
    if (this.form.controls.description.status === 'INVALID') {
      this.error = 'Description is not valid';
      return;
    }
    if (this.tags.length < 3 || this.tags.filter(x => x.length < 3).length > 0) {
      this.error = 'Please enter at least 3 tags, each 3 or more characters';
      return;
    }
    if (!this.category) {
      this.error = 'Category is required';
    }
    if (this.form.invalid) {
      this.error = 'Invalid data';
      return;
    }
    myCollection.name = this.form.value.name;
    myCollection.description = this.form.value.description;
    myCollection.tags = this.tags
    myCollection.category = this.category
    myCollection.updatedAt = new Date();
    this.error = undefined;




    // @todo this is critical code, do not mess




    await this.firebaseService.updateOrCreateCollection(myCollection);
    this.showSuccess = true;
  }

  onChange(event) {
    this.showSuccess = false;
    this.error = undefined;
  }
}

