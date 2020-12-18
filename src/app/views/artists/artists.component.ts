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

  data = [{
    name: 'Mayra Sibley',
    status: 'Lack of Humility',
    details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
    thumb: '/assets/img/profiles/l-5.jpg',
    large: '/assets/img/profiles/5.jpg',
    id: 1
  },
    {
      name: 'Philip Nelms',
      status: 'Lead Developer',
      details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
      thumb: '/assets/img/profiles/l-2.jpg',
      large: '/assets/img/profiles/2.jpg',
      id: 2
    },
    {
      name: 'Kathryn Mengel',
      status: 'Dog & Cat Person',
      details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
      thumb: '/assets/img/profiles/l-10.jpg',
      large: '/assets/img/profiles/10.jpg',
      id: 3
    },
    {
      name: 'Esperanza Lodge',
      status: 'Now giving divorce advices!',
      details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
      thumb: '/assets/img/profiles/l-4.jpg',
      large: '/assets/img/profiles/4.jpg',
      id: 4
    },
    {
      name: 'Ken Ballweg',
      status: 'Hi there, I am using Vien!',
      details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
      thumb: '/assets/img/profiles/l-3.jpg',
      large: '/assets/img/profiles/3.jpg',
      id: 5
    },
    {
      name: 'Rasheeda Vaquera',
      status: '...',
      details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
      thumb: '/assets/img/profiles/l-6.jpg',
      large: '/assets/img/profiles/6.jpg',
      id: 6
    },
    {
      name: 'Linn Ronning',
      status: 'What goes around comes around',
      details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
      thumb: '/assets/img/profiles/l-7.jpg',
      large: '/assets/img/profiles/7.jpg',
      id: 7
    },
    {
      name: 'Marty Otte',
      status: 'Big city life',
      details: 'I’m a web developer. I spend my whole day, practically every day, experimenting with HTML, CSS, and JavaScript; dabbling with Python and Ruby; and inhaling a wide variety of potentially useless information through a few hundred RSS feeds. I build websites that delight and inform. I do it well.',
      thumb: '/assets/img/profiles/l-9.jpg',
      large: '/assets/img/profiles/9.jpg',
      id: 8
    }
  ];
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
