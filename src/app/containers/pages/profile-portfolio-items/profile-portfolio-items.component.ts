import {Component, Input} from '@angular/core';
import products from '../../../data/products';
import { IProduct } from 'src/app/data/api.service';

@Component({
  selector: 'app-profile-portfolio-items',
  templateUrl: './profile-portfolio-items.component.html'
})
export class ProfilePortfolioItemsComponent {
  @Input() items;

  constructor() { }



}
