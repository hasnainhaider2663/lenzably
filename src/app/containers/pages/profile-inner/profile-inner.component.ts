import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: ' app-profile-inner',
  templateUrl: './profile-inner.component.html',
  styleUrls: ['./profile-inner.component.scss']
})
export class ProfileInnerComponent implements OnInit {

  @Input() editMode = false;
  @Input() user;

  constructor() { }

  ngOnInit(): void {
  }

}
