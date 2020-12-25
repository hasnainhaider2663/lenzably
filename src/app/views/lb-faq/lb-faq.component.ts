import { Component, OnInit } from '@angular/core';
import faqData, {IFaq} from "../../data/faq";

@Component({
  selector: 'app-lb-faq',
  templateUrl: './lb-faq.component.html',
  styleUrls: ['./lb-faq.component.scss']
})
export class LbFaqComponent implements OnInit {

  showMobileMenu = false;

  data: IFaq[] = faqData;
  showItemIndex = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
