import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from "../../../firebase.service";

@Component({
  selector: 'app-profile-collection',
  templateUrl: './profile-collection.component.html',
  styleUrls: ['./profile-collection.component.scss']
})
export class ProfileCollectionComponent implements OnInit {
  collections;
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.firebaseService.getUserCollections(x => {
      this.collections = x;
    });
    this.firebaseService.watchUserCollections().subscribe(x=>{

    });
  }

}
