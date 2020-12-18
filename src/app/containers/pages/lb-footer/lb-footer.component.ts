import {Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {ScrollToConfigOptions, ScrollToService} from "@nicky-lenaers/ngx-scroll-to";

@Component({
  selector: 'app-lb-footer',
  templateUrl: './lb-footer.component.html',
  styleUrls: ['./lb-footer.component.scss']
})
export class LbFooterComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, private scrollToService: ScrollToService) {
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-padding-bottom');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-padding-bottom');
  }

  scrollTo(target): void {
    const config: ScrollToConfigOptions = {
      target,
      offset: -150
    };

    this.scrollToService.scrollTo(config);
  }

}
