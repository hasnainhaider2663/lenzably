import {Component, OnInit, ViewChild} from '@angular/core';
import productItems from "../../data/products";
import {ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-lb-orders',
  templateUrl: './lb-orders.component.html',
  styleUrls: ['./lb-orders.component.scss']
})
export class LbOrdersComponent implements OnInit {

  showMobileMenu = false;

  @ViewChild('myTable') table: any;
  rows = productItems.slice(0, 20).map(({title, sales, stock, category, date}) =>
    ({title, sales, stock, category, date}));
  itemsPerPage = 10;
  ColumnMode = ColumnMode;
  columns = [
    {prop: 'title', name: 'Title'},
    {prop: 'sales', name: 'Sales'},
    {prop: 'stock', name: 'Stock'},
    {prop: 'category', name: 'Category'},
    {prop: 'date', name: 'Date'}
  ];
  temp = [...this.rows];


  constructor() {
  }

  ngOnInit(): void {
  }



  onPage(event): void {
  }

  toggleExpandRow(row): void {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event): void {
  }


}
