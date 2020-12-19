import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {concat, Observable, of, Subject} from 'rxjs';
import {Person, SelectDataService} from '../../../forms/select/select.data.service';
import {catchError, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {FirebaseService} from '../../../../firebase.service';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss']
})
export class ModalEditProfileComponent implements OnInit {

  title: string;
  closeBtnName: string;
  basicForm: FormGroup;

  peopleAsyncSearch: Observable<Person[]>;
  peopleLoadingAsyncSearch = false;
  peopleInputAsyncSearch = new Subject<string>();

  config = {
    uploadMultiple: false,
    url: 'https://httpbin.org/post',

    thumbnailWidth: 160,
    // tslint:disable-next-line: max-line-length
    previewTemplate: '<div class="dz-preview dz-file-preview mb-3"><div class="d-flex flex-row "><div class="p-0 w-30 position-relative"><div class="dz-error-mark"><span><i></i></span></div><div class="dz-success-mark"><span><i></i></span></div><div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon" ></i></div></div><div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative"><div><span data-dz-name></span></div><div class="text-primary text-extra-small" data-dz-size /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div><a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a></div>'
  };

  @ViewChild('form') form: NgForm;
  user: any;
  userId = 'VgbSx1fiEpfuwGMNrqaB';
  error;

  constructor(public bsModalRef: BsModalRef, private selectDataService: SelectDataService, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.firebaseService.subscribeToDocument('users', this.userId).subscribe(async y => {
      this.user = y.payload.data();
      if (this.user.avatarFile && this.user.avatarFile.fullPath) {
        this.user.avatar = await this.firebaseService.getFullURL(this.user.avatarFile.fullPath)
      }
      console.log(this.user);
      this.basicForm = new FormGroup({
        avatar: new FormControl(this.user.avatar, [Validators.required]),
        name: new FormControl(this.user.name, [Validators.required, Validators.minLength(2)]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        location: new FormControl(this.user.location, [Validators.required]),
        interests: new FormControl(this.user.interests, [Validators.required]),
        details: new FormControl(this.user.details, [Validators.required]),
        facebook: new FormControl(this.user.facebook, [Validators.required]),
        twitter: new FormControl(this.user.twitter, [Validators.required]),
        instagram: new FormControl(this.user.instagram, [Validators.required]),
        pinterest: new FormControl(this.user.pinterest, [Validators.required]),
      });
    });

    this.peopleAsyncSearch = concat(
      of([]), // default items
      this.peopleInputAsyncSearch.pipe(
        distinctUntilChanged(),
        tap(() => this.peopleLoadingAsyncSearch = true),
        switchMap(term => this.selectDataService.getPeople(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.peopleLoadingAsyncSearch = false)
        ))
      )
    );

  }

  trackByFn(item: Person): string {
    return item.id;
  }


  onUploadError(event): void {
    console.log(event);
    this.error = event[1];
  }

  async onUploadSuccess(event): void {
    console.log(event);
    this.error = undefined;
    await this.firebaseService.uploadFile('users', this.userId, event[0], 'avatarFile');
  }

  async onSubmit(): void {
    console.log(this.basicForm);
    await this.firebaseService.updateDocument('users', this.userId, this.basicForm.value);
  }

}
