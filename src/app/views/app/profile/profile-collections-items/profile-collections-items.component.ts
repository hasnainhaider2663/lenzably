import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../../firebase.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-collections-items',
  templateUrl: './profile-collections-items.component.html',
  styleUrls: ['./profile-collections-items.component.scss']
})
export class ProfileCollectionsItemsComponent implements OnInit {
  assets;
  collectionId;
  constructor(private firebaseService: FirebaseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.params['collectionId'];
    this.firebaseService.getAssetsInCollection(this.collectionId, x => {
      this.assets = x;
    });
  }

}
