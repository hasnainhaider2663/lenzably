import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username;
  user

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    // read username
    //
    this.firebaseService.findAndSubscribeToDocument("users",
      x => x.where('username', '==', 'hasnain2663')).subscribe(
      result => {
        const user = result[0].payload.doc.data()
        this.user = user;
        console.log(user['name'])
      });

  }

}
