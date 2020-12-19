/* tslint:disable:no-string-literal */
import {Injectable} from '@angular/core';
import {Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot, QueryFn} from '@angular/fire/firestore';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";

type  TableTypes = 'users' | 'assets' | 'collections';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  user = {id: undefined};

  constructor(private firestore: AngularFirestore, public storage: AngularFireStorage) {
    this.user.id = 'VgbSx1fiEpfuwGMNrqaB';

  }


  watchAssetsInCollection(collectionId): Observable<any> {
    return this.firestore.collection(`assets`, x => x.where('collectionId', '==', collectionId)).valueChanges();
  }

  getAssetsInCollection(collectionId, cb) {
    const sub = this.firestore.collection(`assets`, x => x.where('collectionId', '==', collectionId)).valueChanges().subscribe(assets => {

      assets.forEach(async asset => {
        // @ts-ignore
        asset['thumbnailURL'] = await this.storage.ref(asset.fullPath).getDownloadURL().toPromise();

      });
      cb(assets);
      sub.unsubscribe()
    })


  }

  getUserCollections(cb) {
    const sub = this.firestore.collection(`collections`, x => x.where('userId', '==', this.user.id)).snapshotChanges().subscribe(collections => {
      console.log('collection', collections);
      collections.forEach(async iterator => {
        // @ts-ignore
        const asset = iterator;
        const data = iterator.payload.doc.data();
        Object.keys(data).forEach(k => {
          asset[k] = data[k]
        });
        asset['thumbnailURL'] = await this.storage.ref(asset['fullPath']).getDownloadURL().toPromise();

      });
      cb(collections);
      sub.unsubscribe()
    })


  }

  watchUserCollections(): Observable<any> {
    return this.firestore.collection(`collections`, x => x.where('userId', '==', this.user.id)).snapshotChanges();
  }

  async getFullURL(url) {
    return await this.storage.ref(url).getDownloadURL().toPromise();
  }

  async uploadAsset(file, data?): Promise<any> {
    const filePath = this.storage.ref(`assets/${this.user.id}`).child(`${file.name}`);
    // use the Blob or File API
    const result = await filePath.put(file);
    const fileInfo = JSON.parse(JSON.stringify(result.metadata));
    fileInfo['userId'] = this.user.id;
    fileInfo.md5Hash = fileInfo.md5Hash.replace('/', '*');
    // const docRef = this.firestore.doc(`assets/${fileInfo.md5Hash}`)
    // if (docRef) {
    //   console.log('already exists')
    //   await this.storage.ref(`assets/${this.user.id}/${file.name}`).delete().toPromise()
    //   return true
    // }
    Object.keys(data).forEach(z => {
      fileInfo[z] = data[z]
    });
    return await this.firestore.doc(`assets/${fileInfo.md5Hash}`).set(fileInfo);
  }

  subscribeToDocument(tableName: TableTypes, documentReference): Observable<Action<DocumentSnapshot<any>>> {
    return this.firestore.doc(documentReference).snapshotChanges();
  }

  findAndSubscribeToDocument(tableName: TableTypes, condition: QueryFn): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection(tableName, condition).snapshotChanges();
  }

  async updateAsset(md5Hash, data): Promise<any> {
    await this.firestore.doc(`assets/${md5Hash}`).update(data);
  }

  async updateUser(ref, data): Promise<any> {
    await this.firestore.doc(`user/${ref}`).update(data);
  }

  async updateCollection(ref, data): Promise<any> {
    await this.firestore.doc(`collections/${ref}`).update(data);
  }

  async updateBatch(items, data): Promise<any> {
    items.forEach(async x => {
      await this.firestore.doc(`assets/${x.md5Hash}`).update(data);
    });
  }

  async createDocumentInCollection(path, document): Promise<any> {
    await this.firestore.doc(path).set(document);
  }

}
