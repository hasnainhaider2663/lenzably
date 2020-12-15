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

@Injectable({
  providedIn: 'root'
})
export class GenericAngularService {

  userObservable: Observable<any>;
  userDocument: AngularFirestoreDocument;
  userTable: AngularFirestoreCollection
  firestore: AngularFirestore

  constructor(firestore: AngularFirestore) {
    this.firestore = firestore
    // firestore
    // firestore.doc('/users/VgbSx1fiEpfuwGMNrqaB')
    this.userDocument = firestore.doc('/users/VgbSx1fiEpfuwGMNrqaB');
    this.userObservable = firestore.doc('/users/VgbSx1fiEpfuwGMNrqaB').valueChanges();
    this.userTable = firestore.collection('users')
  }


  subscribeToCollection(path): AngularFirestoreCollection<any> {
   return  this.firestore.collection(path)
  }

  subscribeToDocument(path): AngularFirestoreDocument<any> {
    return this.firestore.doc(path)
  }

  async updateDocument(path) {
    await this.firestore.doc(path).update(path)
  }

  async createDocumentInCollection(path, document) {
    await this.firestore.doc(path).set(document)
  }

}
