import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-lb-footer',
  templateUrl: './lb-footer.component.html',
  styleUrls: ['./lb-footer.component.scss']
})
export class LbFooterComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-padding-bottom');
  }
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-padding-bottom');
  }
}
