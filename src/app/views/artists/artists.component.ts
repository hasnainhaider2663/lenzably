import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  ElementRef,
} from '@angular/core';
import {ScrollToService, ScrollToConfigOptions} from '@nicky-lenaers/ngx-scroll-to';
import {environment} from 'src/environments/environment';
import {Observable, Subject} from "rxjs";
import {Person} from "../../containers/forms/select/select.data.service";
import {blogData} from "../../data/blog";
import {carouselData, ICarouselItem} from "../../data/carousels";

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef, private scrollToService: ScrollToService) {
  }

  data = blogData.slice();
  carouselItems: ICarouselItem[] = carouselData;

  showMobileMenu = false;

  peopleAsyncSearch: Observable<Person[]>;
  peopleLoadingAsyncSearch = false;
  peopleInputAsyncSearch = new Subject<string>();
  selectedPersonsAsyncSearch = [];

  buyUrl = environment.buyUrl;
  adminRoot = environment.adminRoot;


  ngOnInit(): void {
  }


  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    const homeRect = this.elRef.nativeElement
      .querySelector('.home-row')
      .getBoundingClientRect();

    const homeSection = this.elRef.nativeElement.querySelector(
      '.landing-page .section.home'
    );
    homeSection.style.backgroundPositionX = homeRect.x - 580 + 'px';

    const footerSection = this.elRef.nativeElement.querySelector(
      '.landing-page .section.footer'
    );
    footerSection.style.backgroundPositionX = event.target.innerWidth - homeRect.x - 2000 + 'px';

    if (event.target.innerWidth >= 992) {
      this.renderer.removeClass(
        this.elRef.nativeElement.querySelector('.landing-page'),
        'show-mobile-menu'
      );
    }
  }

  @HostListener('window:click', ['$event'])
  onClick(event): void {
    this.showMobileMenu = false;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event): void {
    this.showMobileMenu = false;
  }

  scrollTo(target): void {
    const config: ScrollToConfigOptions = {
      target,
      offset: -150
    };

    this.scrollToService.scrollTo(config);
  }


  trackByFn(item: Person): string {
    return item.id;
  }

}
