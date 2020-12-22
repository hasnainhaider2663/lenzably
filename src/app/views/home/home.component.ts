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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef, private scrollToService: ScrollToService) {
  }

  showMobileMenu = false;

  peopleAsyncSearch: Observable<Person[]>;
  peopleLoadingAsyncSearch = false;
  peopleInputAsyncSearch = new Subject<string>();
  selectedPersonsAsyncSearch = [];

  buyUrl = environment.buyUrl;
  adminRoot = environment.adminRoot;
  tagsList = [
    {
      name: 'Flour',
      link: 'Flour'
    },
    {
      name: 'Chocolate',
      link: 'Chocolate'
    },
    {
      name: 'Caster Sugar',
      link: 'Caster Sugar'
    },
    {
      name: 'Baking Powder',
      link: 'Baking Powder'
    },
    {
      name: 'Eggs',
      link: 'Eggs'
    },
    {
      name: 'Vegetable Oil',
      link: 'Vegetable Oil'
    },
    {
      name: 'Flour',
      link: 'Flour'
    },
    {
      name: 'Chocolate',
      link: 'Chocolate'
    },
    {
      name: 'Caster Sugar',
      link: 'Caster Sugar'
    },
    {
      name: 'Baking Powder',
      link: 'Baking Powder'
    },
    {
      name: 'Eggs',
      link: 'Eggs'
    },
    {
      name: 'Vegetable Oil',
      link: 'Vegetable Oil'
    },
    {
      name: 'Flour',
      link: 'Flour'
    },
    {
      name: 'Chocolate',
      link: 'Chocolate'
    },
    {
      name: 'Caster Sugar',
      link: 'Caster Sugar'
    },
    {
      name: 'Baking Powder',
      link: 'Baking Powder'
    },
    {
      name: 'Eggs',
      link: 'Eggs'
    },
    {
      name: 'Vegetable Oil',
      link: 'Vegetable Oil'
    },
  ];


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
