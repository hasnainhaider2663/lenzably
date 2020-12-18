import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FireBaseAPI {

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


  subscribeToCollectionWithQuery(path, query: QueryFn): AngularFirestoreCollection<any> {
    return this.firestore.collection(path, query);
  }

  subscribeToDocument(path): AngularFirestoreDocument<any> {
    return this.firestore.doc(path);
  }

  deleteDocument(path): Promise<any> {
    return this.firestore.doc(path).delete();
  }

  async updateDocument(path): Promise<any> {
    await this.firestore.doc(path).update(path);
  }

  async createDocumentInCollection(path, document): Promise<any> {
    await this.firestore.doc(path).set(document);
  }

}
