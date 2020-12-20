import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-public-grid',
  templateUrl: './public-grid.component.html',
  styleUrls: ['./public-grid.component.scss']
})
export class PublicGridComponent implements OnInit {
  @Input() assets = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
