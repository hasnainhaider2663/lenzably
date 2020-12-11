import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  user: Observable<any>;
  constructor(firestore: AngularFirestore) {
    this.user = firestore.doc('/users/VgbSx1fiEpfuwGMNrqaB').valueChanges();
  }
}
