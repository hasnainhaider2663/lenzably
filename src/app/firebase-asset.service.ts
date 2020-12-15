/* tslint:disable:no-string-literal */
import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/storage";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseAssetService {
  user = {id: undefined};

  constructor(private firestore: AngularFirestore, public storage: AngularFireStorage) {
    this.user.id = 'VgbSx1fiEpfuwGMNrqaB';

  }


  watchUserAssets(): Observable<any> {
   return  this.firestore.collection(`assets`, x => x.where('userId', '==', this.user.id)).valueChanges();
  }

  getUserAssets(cb) {
    const sub = this.firestore.collection(`assets`, x => x.where('userId', '==', this.user.id)).valueChanges().subscribe(assets => {

      assets.forEach(async asset => {
        // @ts-ignore
        asset['thumbnailURL'] = await this.storage.ref(asset.fullPath).getDownloadURL().toPromise();

      });
      cb(assets)
      sub.unsubscribe()
    })


  }

async  getFullURL(url){
    return  await this.storage.ref(url).getDownloadURL().toPromise();
  }

  async uploadAsset(file): Promise<any> {
    const filePath = this.storage.ref(`assets/${this.user.id}`).child(`${file.name}`);
    // use the Blob or File API
    const result = await filePath.put(file);
    const fileInfo = JSON.parse(JSON.stringify(result.metadata));
    fileInfo['userId'] = this.user.id;
    return await this.firestore.collection('assets').add(fileInfo);
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
