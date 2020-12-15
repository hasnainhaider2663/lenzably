import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AngularFireService {

  userObservable: Observable<any>;
  userDocument: AngularFirestoreDocument;
  userTable: AngularFirestoreCollection

  constructor(firestore: AngularFirestore) {
    // firestore
    // firestore.doc('/users/VgbSx1fiEpfuwGMNrqaB')
    this.userDocument = firestore.doc('/users/VgbSx1fiEpfuwGMNrqaB');
    this.userObservable = firestore.doc('/users/VgbSx1fiEpfuwGMNrqaB').valueChanges();
    this.userTable = firestore.collection('users')
  }
}
