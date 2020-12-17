import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-list-page-header',
  templateUrl: './list-page-header.component.html'
})
export class ListPageHeaderComponent {
  displayOptionsCollapsed = false;

  @Input() showOrderBy = true;
  @Input() showSearch = true;
  @Input() showCheckbox = false;
  @Input() showItemsPerPage = true;
  @Input() showAddNewButton = false;
  @Input() showDisplayMode = true;
  @Input() displayMode = 'list';
  @Input() selectAllState = '';
  @Input() itemsPerPage = 10;
  @Input() itemOptionsPerPage = [5, 10, 20];
  @Input() itemOrder = {label: 'File Name', value: 'name'};
  @Input() itemOptionsOrders = [
    {label: 'Product Name', value: 'title'},
    {label: 'Category', value: 'category'},
    {label: 'Status', value: 'status'}];
  @Input() dropDownItems = [];
  @Output() changeDisplayMode: EventEmitter<string> = new EventEmitter<string>();
  @Output() addNewItem: EventEmitter<any> = new EventEmitter();
  @Output() selectAllChange: EventEmitter<any> = new EventEmitter();
  @Output() searchKeyUp: EventEmitter<any> = new EventEmitter();
  @Output() itemsPerPageChange: EventEmitter<any> = new EventEmitter();
  @Output() changeOrderBy: EventEmitter<any> = new EventEmitter();
  @Output() changeDropdownItem: EventEmitter<any> = new EventEmitter();

  @ViewChild('search') search: any;
  @Input() title: any;

  constructor() {
  }


  onSelectDisplayMode(mode: string): void {
    this.changeDisplayMode.emit(mode);
  }

  onAddNewItem(): void {
    this.addNewItem.emit(null);
  }

  selectAll(event): void {
    this.selectAllChange.emit(event);
  }

  onChangeItemsPerPage(item): void {
    this.itemsPerPageChange.emit(item);
  }

  onChangeOrderBy(item): void {
    this.itemOrder = item;
    this.changeOrderBy.emit(item);
  }

  onSearchKeyUp($event): void {
    this.searchKeyUp.emit($event);
  }

  dropDownItemClicked(dropDownItem: any) {
    this.changeDropdownItem.emit(dropDownItem);
  }
}
