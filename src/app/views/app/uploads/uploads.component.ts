import {Component, OnInit, ViewChild} from '@angular/core';
import {AddNewProductModalComponent} from 'src/app/containers/pages/add-new-product-modal/add-new-product-modal.component';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {ApiService, IProduct} from 'src/app/data/api.service';
import {ContextMenuComponent} from 'ngx-contextmenu';
import {AngularFireService} from '../../../angular-fire.service';
import {FirebaseAssetService} from '../../../firebase-asset.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  displayMode = 'image';
  selectAllState = '';
  selected: IProduct[] = [];
  data: IProduct[] = [];
  currentPage = 1;
  itemsPerPage = 8;
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
  @ViewChild('addNewModalRef', {static: true}) addNewModalRef: AddNewProductModalComponent;
  user;
  assets;
  originalAssets;

  constructor(private assetService: FirebaseAssetService, private hotkeysService: HotkeysService, private apiService: ApiService, private angularFireService: AngularFireService) {
    this.hotkeysService.add(new Hotkey('ctrl+a', (event: KeyboardEvent): boolean => {
      this.selected = [...this.data];
      return false;
    }));
    this.hotkeysService.add(new Hotkey('ctrl+d', (event: KeyboardEvent): boolean => {
      this.selected = [];
      return false;
    }));
  }

  async ngOnInit() {
    this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);


    this.user = this.angularFireService.userObservable;


    this.assetService.getUserAssets(x => {
      this.assets = x;
      this.originalAssets = x;
      console.log(this.assets);
    });

    this.assetService.watchUserAssets().subscribe(assetsArray => {
      assetsArray.forEach(async asset => {
       try {
         if (!(this.assets.find(x => x.md5Hash === asset.md5Hash))) {
           asset['thumbnailURL'] = await this.assetService.getFullURL(asset.fullPath)
           this.assets.push(asset)
         }
       }catch (e) {

       }
      });
    });

  }

  loadData(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = ''): void {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;

    this.apiService.getProducts(pageSize, currentPage, search, orderBy).subscribe(
      data => {
        if (data.status) {
          this.isLoading = false;
          this.data = data.data.map(x => {
            return {
              ...x,
              img: x.img.replace('/img/', '/img/products/')
            };
          });
          this.totalItem = data.totalItem;
          this.totalPage = data.totalPage;
          this.setSelectAllState();
        } else {
          this.endOfTheList = true;
        }
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  showAddNewModal(): void {
    this.addNewModalRef.show();
  }

  isSelected(p: IProduct): boolean {
    return this.selected.findIndex(x => x.id === p.id) > -1;
  }

  onSelect(item: IProduct): void {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter(x => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState(): void {
    if (this.selected.length === this.data.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event): void {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number): void {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any): void {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event): void {
    const val = event.target.value.toLowerCase().trim();
    this.assets = this.originalAssets.filter(x => x.name.includes(val));
  }

  onContextMenuClick(action: string, item: IProduct): void {
    console.log('onContextMenuClick -> action :  ', action, ', item.title :', item.title);
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

    const result = await this.assetService.uploadAsset(event[0]);
    console.log(result);
  }
}
