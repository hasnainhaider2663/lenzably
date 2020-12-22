import {Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-lb-nav-menu',
  templateUrl: './lb-nav-menu.component.html',
  styleUrls: ['./lb-nav-menu.component.scss']
})
export class LbNavMenuComponent implements OnInit {

  user;
  didCheck = false;
  @Input() isMobileMenu = false;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.userObservable.subscribe(value => {
      this.user = value;
      this.didCheck = true;
    } );
  }

}
