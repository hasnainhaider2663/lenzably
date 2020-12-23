import { Component, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-collection-items',
  templateUrl: './collection-items.component.html',
  styleUrls: ['./collection-items.component.scss']
})
export class CollectionItemsComponent implements OnInit {

  showMobileMenu = false;
  adminRoot = environment.adminRoot;
  constructor() { }

  ngOnInit(): void {
  }

}
