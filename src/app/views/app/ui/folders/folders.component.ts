import {Component, OnInit, ViewChild} from '@angular/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {ApiService, IProduct} from 'src/app/data/api.service';
import {ContextMenuComponent} from 'ngx-contextmenu';
import {AngularFireService} from '../../../angular-fire.service';
import {FirebaseAssetService} from '../../../firebase-asset.service';
import {EditProductNameModalComponent} from "../../../../containers/pages/edit-product-name-modal/edit-product-name-modal.component";
import {EditProductDescriptionModalComponent} from "../../../../containers/pages/edit-product-description-modal/edit-product-description-modal.component";
import {EditProductCategoriesModalComponent} from "../../../../containers/pages/edit-product-categories-modal/edit-product-categories-modal.component";
import {EditProductTagsModalComponent} from "../../../../containers/pages/edit-product-tags-modal/edit-product-tags-modal.component";


@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {
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
  @ViewChild('editProductNameModalComponent', {static: true}) editProductNameModalComponent: EditProductNameModalComponent;
  @ViewChild('editProductDescriptionModalComponent', {static: true}) editProductDescriptionModalComponent: EditProductDescriptionModalComponent;
  @ViewChild('editProductCategoriesModalComponent', {static: true}) editProductCategoriesModalComponent: EditProductCategoriesModalComponent;
  @ViewChild('editProductTagsModalComponent', {static: true}) editProductTagsModalComponent: EditProductTagsModalComponent;
  user;
  assets;
  originalAssets;
  error: any;

  constructor(private assetService: FirebaseAssetService, private hotkeysService: HotkeysService, private apiService: ApiService, private angularFireService: AngularFireService) {
    this.hotkeysService.add(new Hotkey('ctrl+a', (event: KeyboardEvent): boolean => {
      this.selectedItemsArray = [...this.assets];
      return false;
    }));
    this.hotkeysService.add(new Hotkey('ctrl+d', (event: KeyboardEvent): boolean => {
      this.selectedItemsArray = [];
      return false;
    }));
  }

  async ngOnInit() {


    this.user = this.angularFireService.userObservable;


    this.assetService.getUserAssets(x => {
      this.assets = x;
      this.originalAssets = x;
      console.log(this.assets);
    });

    this.assetService.watchUserAssets().subscribe(assetsArray => {
      assetsArray.forEach(async updatedAsset => {
        try {
          const assetInArray = this.assets.find(x => x.md5Hash === updatedAsset.md5Hash);
          if (!(assetInArray)) {
            updatedAsset.thumbnailURL = await this.assetService.getFullURL(updatedAsset.fullPath);
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

  changeDisplayMode(mode): void {
    this.displayMode = mode;
  }

  showAddNewModal(): void {
    // this.addNewModalRef.show();
  }


  showModal(component) {
    component.items = this.selectedItemsArray;
    component.show();
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
        if (x.updated < y.updated) {
          return 1;
        } else if (x.updated > y.updated) {
          return -1;
        }
        return 0;
      });
    }

    if (item.value === 'oldest') {
      this.assets = this.originalAssets.sort((x, y) => {
        // 11 < 12 means 12 comes after 11
        if (x.updated < y.updated) {
          return -1;
        } else if (x.updated > y.updated) {
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
    this.selectedItemsArray = [item];
    switch (action) {
      case 'name':
        this.editProductNameModalComponent.inputText = item.name;
        this.showModal(this.editProductNameModalComponent);
        break;
      case 'description':
        this.editProductDescriptionModalComponent.inputText = item.description;
        this.showModal(this.editProductDescriptionModalComponent);
        break;
      case 'tags':
        this.editProductTagsModalComponent.replaceTags = 'replace';
        this.editProductTagsModalComponent.tags = item.tags;
        this.showModal(this.editProductTagsModalComponent);
        break;
      case 'category':
        this.editProductCategoriesModalComponent.category = item.category;
        this.showModal(this.editProductCategoriesModalComponent);
        break;

    }
    console.log('onContextMenuClick -> action :  ', action, ', item.title :', item.title);
  }

  changeDropdownItem($event: any) {
    switch ($event.value) {
      case 'name':
        this.showModal(this.editProductNameModalComponent);
        break;
      case 'description':
        this.showModal(this.editProductDescriptionModalComponent);
        break;
      case 'tags':
        this.editProductTagsModalComponent.replaceTags = 'append';
        this.editProductTagsModalComponent.tags = this.findTagIntersection();
        this.showModal(this.editProductTagsModalComponent);
        break;
      case 'category':
        this.editProductCategoriesModalComponent.category = this.findcategoryIntersection();
        this.showModal(this.editProductCategoriesModalComponent);
        break;

    }
  }

  findTagIntersection() {
    const intersection = [];
    this.selectedItemsArray.forEach(myItem => {
      if (myItem.tags) {
        myItem.tags.forEach(tag => {
          if (!intersection.includes(tag)) {
            // console.log(this.selectedItemsArray.filter(z => z.tags && z.tags.includes(tag)));
            if (this.selectedItemsArray.filter(z => z.tags && z.tags.includes(tag)).length === this.selectedItemsArray.length) {
              intersection.push(tag);
            }
          }
          console.log(intersection);
        });
      }
    });
    return intersection;
  }

  findcategoryIntersection() {
    let intersection;
    if (this.selectedItemsArray.filter(z => z.category && this.selectedItemsArray[0].category && (z.category.value === this.selectedItemsArray[0].category.value)).length === this.selectedItemsArray.length) {
      intersection = this.selectedItemsArray[0].category;
    }
    console.log(intersection);

    return intersection;
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
