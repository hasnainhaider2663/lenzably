import {Injectable} from "@angular/core";
import {FirebaseApp} from "@angular/fire";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  storageRef;

  constructor(firebase: FirebaseApp) {
    // firestore
    // this.storageRef = firebase.storage('assets').ref();
  }

  upload(filename, file): void {
    const path = this.storageRef.child(`assets/VgbSx1fiEpfuwGMNrqaB/${filename}`)
    // use the Blob or File API
    path.put(file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }
}
