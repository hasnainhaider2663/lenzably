import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lb-tags-list',
  templateUrl: './lb-tags-list.component.html',
  styleUrls: ['./lb-tags-list.component.scss']
})
export class LbTagsListComponent implements OnInit {

  @Input() tagsList;
  @Input() alignCenter = false;

  constructor() { }

  ngOnInit(): void {
  }

}
