import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username;
  user;
  collections;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    // read username
    //
    this.firebaseService.findAndSubscribeToDocument('users',
      x => x.where('username', '==', this.username)).subscribe(
      result => {
        this.user = result[0].payload.doc.data();
        console.log(this.user);
      });


    //   this.firebaseService.getAssetsInCollection(this.collectionId, x => {
    //     this.assets = x;
    //   });
  }


}
