import {Component, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss']
})
export class ModalEditProfileComponent implements OnInit {

  title: string;
  closeBtnName: string;
  basicForm: FormGroup;

  @ViewChild('form') form: NgForm;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.basicForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      location: new FormControl(null, [Validators.required]),
      state: new FormControl(null, [Validators.required]),
      details: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    console.log(this.basicForm);
  }

}
