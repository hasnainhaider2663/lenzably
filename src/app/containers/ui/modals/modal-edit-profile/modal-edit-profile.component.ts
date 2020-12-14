import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss']
})
export class ModalEditProfileComponent implements OnInit {

  title: string;
  closeBtnName: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
