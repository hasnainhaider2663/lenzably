import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-lb-nav',
  templateUrl: './lb-nav.component.html',
  styleUrls: ['./lb-nav.component.scss']
})
export class LbNavComponent implements OnInit {
  user;

  @Output() mobileMenuButtonEvent = new EventEmitter();

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.userObservable.subscribe(value => {
      this.user = value;

    } );
  }

  mobileMenuButton() {
    this.mobileMenuButtonEvent.emit();
  }
}
