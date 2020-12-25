/* tslint:disable:no-string-literal */
import {Injectable} from '@angular/core';
import {Action, AngularFirestore, DocumentChangeAction, DocumentSnapshot, QueryFn} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, take} from 'rxjs/operators';
import * as firebase from 'firebase';
import {Guid} from 'guid-typescript';
import {environment} from '../environments/environment';
import {FirebaseApp} from "@angular/fire";


type  TableTypes = 'users' | 'assets' | 'collections';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userObservable: Observable<any>;
  assetTableName = 'assets/';

  constructor(private firestore: AngularFirestore, private firebaseAuth: AngularFireAuth, public storage: AngularFireStorage, private firebaseApp: FirebaseApp) {

    this.userObservable = this.firebaseAuth.authState
      .pipe(take(1)).pipe(map(mUser => {
        const user = JSON.parse(JSON.stringify(mUser));

        user['isArtist'] = true;
        // user.uid = 'VgbSx1fiEpfuwGMNrqaB';
        // user.id = 'VgbSx1fiEpfuwGMNrqaB';
        console.log('UU # 987');
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getMd5(file) {
    return new MD5(file)
  }

  watchAssetsInCollection(collectionId): Observable<any> {
    return this.firestore.collection(this.assetTableName, x => x.where('collectionId', '==', collectionId)).valueChanges();
  }

  getAssetsInCollection(collectionId, cb) {
    const sub = this.firestore.collection(this.assetTableName, x => x.where('collectionId', '==', collectionId)).valueChanges().subscribe(assets => {

      // assets.forEach(async asset => {
      //   // @ts-ignore
      //   // asset['thumbnailURL'] = await this.storage.ref(asset.fullPath).getDownloadURL().toPromise();
      //
      // });
      cb(assets);
      sub.unsubscribe();
    });


  }

  getUserCollections(cb) {
    const sub = this.firestore.collection(`collections`, x => x.where('userId', '==', this.currentUser.uid)).snapshotChanges().subscribe(collections => {
      console.log('collection', collections);
      collections.forEach(async iterator => {
        // @ts-ignore
        const asset = iterator;
        const data = iterator.payload.doc.data();
        Object.keys(data).forEach(k => {
          asset[k] = data[k];
        });
        asset['thumbnailURL'] = await this.storage.ref(asset['fullPath']).getDownloadURL().toPromise();

      });
      cb(collections);
      sub.unsubscribe();
    });


  }

  watchUserCollections(): Observable<any> {
    return this.firestore.collection(`collections`, x => x.where('userId', '==', this.currentUser.uid)).snapshotChanges();
  }

  async getFullURL(url) {
    return await this.storage.ref(url).getDownloadURL().toPromise();
  }

  async uploadAsset(file, collectionId): Promise<any> {
    try {
      console.log('MD5', this.getMd5(file));
      const originalAssetStorage = this.firebaseApp.storage(environment.firebase.originalAssetBucketName)
      // const assetRecord = await this.firestore.collection('sourceAssetFiles').add({userId: this.currentUser.uid})

      const filePath = originalAssetStorage.ref(`${this.currentUser.uid}/${collectionId}`).child(file.name);
      // use the Blob or File API
      const result = await filePath.put(file, {customMetadata: {collectionId, userId: this.currentUser.uid}});
      const fileInfo = JSON.parse(JSON.stringify(result.metadata));
      // const docRef = this.firestore.doc(`assets/${fileInfo.md5Hash}`)
      // if (docRef) {
      //   console.log('already exists')
      //   await this.storage.ref(`assets/${this.user.id}/${file.name}`).delete().toPromise()
      //   return true
      // }
      console.log('uploaded file', fileInfo);
      return fileInfo;
    } catch (e) {
      throw e;
    }
  }

  async uploadFile(tableName: TableTypes, documentReference, file, paramToAssignTo): Promise<any> {

    file.uid = Guid.create();
    const filePath = this.storage.ref(`${tableName}/${documentReference}`).child(`${file.uid}`);
    // use the Blob or File API
    // const fileInfo = JSON.parse(JSON.stringify(result.metadata));
    //
    // fileInfo.md5Hash = fileInfo.md5Hash.replace('/', '*');
    // const data = {};
    // data[paramToAssignTo] = fileInfo;
    // return await this.firestore.doc(`${tableName}/${documentReference}`).update(data);
    return await filePath.put(file);
  }

  subscribeToDocument(tableName: TableTypes, documentReference): Observable<Action<DocumentSnapshot<any>>> {
    return this.firestore.doc(`${tableName}/${documentReference}`).snapshotChanges();
  }

  findAndSubscribeToDocument(tableName: TableTypes, condition: QueryFn): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection(tableName, condition).snapshotChanges();
  }

  async updateAsset(md5Hash, data): Promise<any> {
    await this.firestore.doc(`${this.assetTableName}${md5Hash}`).update(data);
  }

  async updateDocument(tableName: TableTypes, documentReference, data): Promise<any> {
    await this.firestore.doc(`${tableName}/${documentReference}`).update(data);
  }

  async updateUser(ref, data): Promise<any> {
    await this.firestore.doc(`user/${ref}`).update(data);
  }

  async updateOrCreateCollection(collection): Promise<any> {
    // @todo do not touch the following line => Hasnain only!!!
    if (collection.payload && collection.payload && collection.payload.doc && collection.payload.doc.id) {
      const ref = collection.payload.doc.id;
      delete collection.payload;
      await this.firestore.doc(`collections/${ref}`).update(collection);
    } else {
      collection.userId = this.currentUser.uid;
      await this.firestore.collection(`collections`).add(collection);
    }

  }

  async updateBatch(items, data): Promise<any> {
    const result = [];
    items.forEach(async x => {
      const singleRes = await this.firestore.doc(`${this.assetTableName}${x.md5Hash}`).update(data);
      result.push(singleRes);
    });
    return result;
  }

  async createDocumentInCollection(path, document): Promise<any> {
    await this.firestore.doc(path).set(document);
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    try {
      return await this.firebaseAuth
        .createUserWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }

  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      return await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      throw e;
    }

  }

  async sendPasswordResetEmail(email: string, password: string) {
    try {
      return await this.firebaseAuth.sendPasswordResetEmail(email);
    } catch (e) {
      throw e;
    }

  }

  async verifyPasswordResetCode(code) {
    try {
      return await this.firebaseAuth.verifyPasswordResetCode(code);
    } catch (e) {
      throw e;
    }

  }

  async signOut() {
    await this.firebaseAuth.signOut();
  }

  async loginWithGoogle() {

    return await this.firebaseAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

}
