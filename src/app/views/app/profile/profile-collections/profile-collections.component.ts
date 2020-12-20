import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from "../../../../firebase.service";

@Component({
  selector: 'app-profile-collections',
  templateUrl: './profile-collections.component.html',
  styleUrls: ['./profile-collections.component.scss']
})
export class ProfileCollectionsComponent implements OnInit {
  collections
  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.firebaseService.getUserCollections(x => {
      this.collections = x;
    });
    this.firebaseService.watchUserCollections().subscribe(x=>{

    })
  }

}
