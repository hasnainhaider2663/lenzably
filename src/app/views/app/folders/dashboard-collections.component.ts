import {Component, OnInit, ViewChild} from '@angular/core';
import {HotkeysService} from 'angular2-hotkeys';
import {ApiService, IProduct} from 'src/app/data/api.service';
import {ContextMenuComponent} from 'ngx-contextmenu';
import {FirebaseService} from '../../../firebase.service';
import {AngularFireService} from '../../../angular-fire.service';
import {EditFolderNameModalComponent} from './edit-folder-name-modal/edit-folder-name-modal.component';


@Component({
  selector: 'app-dashboard-collections',
  templateUrl: './dashboard-collections.component.html',
  styleUrls: ['./dashboard-collections.component.scss']
})
export class DashboardCollectionsComponent implements OnInit {
  displayMode = 'image';
  selectAllState = '';
  selectedItemsArray = [];
  data: IProduct[] = [];
  currentPage = 1;
  itemsPerPage = 50;
  search = '';
  orderBy = '';
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;
  config = {
    url: 'https://httpbin.org/post',
    thumbnailWidth: 160,
    // tslint:disable-next-line: max-line-length
    previewTemplate: '<div class="dz-preview dz-file-preview mb-3"><div class="d-flex flex-row "><div class="p-0 w-30 position-relative"><div class="dz-error-mark"><span><i></i></span></div><div class="dz-success-mark"><span><i></i></span></div><div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon" ></i></div></div><div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative"><div><span data-dz-name></span></div><div class="text-primary text-extra-small" data-dz-size /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div><a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a></div>'
  };


  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  @ViewChild('editFolderNameModalComponent', {static: true}) editFolderNameModalComponent: EditFolderNameModalComponent;

  user;
  assets;
  originalAssets;
  error: any;

  constructor(private firebaseService: FirebaseService, private hotkeysService: HotkeysService, private apiService: ApiService, private angularFireService: AngularFireService) {

  }

  async ngOnInit() {


    this.user = this.angularFireService.userObservable;


    this.firebaseService.getUserCollections(x => {
      this.assets = x;
      this.originalAssets = x;
      console.log(this.assets);
    });

    this.firebaseService.watchUserCollections().subscribe(assetsArray => {
      assetsArray.forEach(async iterator => {
        const updatedAsset = iterator;
        Object.keys(iterator.payload.doc.data()).forEach(l => {
          updatedAsset[l] = iterator.payload.doc.data()[l]
        });
        try {
          if (updatedAsset.fullPath) {
            updatedAsset.thumbnailURL = await this.firebaseService.getFullURL(updatedAsset.fullPath);
          }
          const assetInArray = this.assets.find(x => x.payload.doc.id === updatedAsset.payload.doc.id);
          if (!(assetInArray)) {

            this.assets.push(updatedAsset);
          } else {
            Object.keys(updatedAsset).forEach(key => {
              assetInArray[key] = updatedAsset[key];
            });

          }
        } catch (e) {

        }
      });
    });

  }


  showAddNewModal(): void {
    this.editFolderNameModalComponent.resetCollection();
    this.editFolderNameModalComponent.show();
  }

  isSelected(p): boolean {
    return this.selectedItemsArray.findIndex(x => x.md5Hash === p.md5Hash) > -1;
  }

  onSelect(item): void {
    if (this.isSelected(item)) {
      this.selectedItemsArray = this.selectedItemsArray.filter(x => x.md5Hash !== item.md5Hash);
    } else {
      this.selectedItemsArray.push(item);
    }
    this.setSelectAllState();

  }

  setSelectAllState(): void {
    if (this.selectedItemsArray.length === this.assets.length) {
      this.selectAllState = 'checked';
    } else if (this.selectedItemsArray.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selectedItemsArray = [...this.assets];
    } else {
      this.selectedItemsArray = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    // this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number): void {
    // this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any): void {
    console.log(item);
    if (item.value === 'name') {
      this.assets = this.originalAssets.sort((x, y) => {
        if (x.name.toLowerCase() < y.name.toLowerCase()) {
          return -1;
        } else if (x.name.toLowerCase() > y.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }

    if (item.value === 'latest') {
      this.assets = this.originalAssets.sort((x, y) => {
        // 11 < 12 means 12 should comes before 11 so that we get the latest item first
        if (x.updatedAt < y.updatedAt) {
          return 1;
        } else if (x.updatedAt > y.updatedAt) {
          return -1;
        }
        return 0;
      });
    }

    if (item.value === 'oldest') {
      this.assets = this.originalAssets.sort((x, y) => {
        // 11 < 12 means 12 comes after 11
        if (x.updatedAt < y.updatedAt) {
          return -1;
        } else if (x.updatedAt > y.updatedAt) {
          return 1;
        }
        return 0;
      });
    }

  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.assets = this.originalAssets.filter(x => x.name.toLowerCase().includes(val));
  }

  onContextMenuClick(action: string, item): void {

    switch (action) {
      case 'edit':
        this.editFolderNameModalComponent.collection = item;
        this.editFolderNameModalComponent.show()
        break;
      case 'update':
        break;
    }
  }


  onUploadError(event): void {
    console.log(event[1]);
    console.log('error event', event[0].type);
    console.log('error event', event);
    alert(event[1]);
  }

  // @ts-ignore
  async onUploadSuccess(event): void {
    const data = {
      width: event[0].width,
      filename: event[0].name,
      type: event[0].type,
      height: event[0].height,
      size: event[0].size
    };
    console.log(data);
    console.log(event);

    // const result = await this.firebaseService.uploadAsset(event[0]);
    // console.log(result);
  }

}
