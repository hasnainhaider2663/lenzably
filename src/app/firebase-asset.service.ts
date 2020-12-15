import {Injectable} from "@angular/core";
import {FireBaseAPI} from "./fire-base-a-p-i.service";
import {AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAssetService {

  constructor(private fireBaseAPI: FireBaseAPI) {

  }


  getUserAssets(): AngularFirestoreCollection<any> {
    return this.fireBaseAPI.subscribeToCollectionWithQuery('assets');
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
