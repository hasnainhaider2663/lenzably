import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-lb-nav',
  templateUrl: './lb-nav.component.html',
  styleUrls: ['./lb-nav.component.scss']
})
export class LbNavComponent implements OnInit {

  @Output() mobileMenuButtonEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  mobileMenuButton() {
    this.mobileMenuButtonEvent.emit();
  }
}
