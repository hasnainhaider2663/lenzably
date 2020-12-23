import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Router} from "@angular/router";
import {Lightbox} from "ngx-lightbox";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(private renderer: Renderer2, private elRef: ElementRef,
              private router: Router, private lightbox: Lightbox) {
  }


  showMobileMenu = false;

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

  album = [
    {
      src: '/assets/img/products/marble-cake.jpg',
      thumb: '/assets/img/products/marble-cake-thumb.jpg'
    },
    {
      src: '/assets/img/products/parkin.jpg',
      thumb: '/assets/img/products/parkin-thumb.jpg'
    },
    {
      src: '/assets/img/products/fruitcake.jpg',
      thumb: '/assets/img/products/fruitcake-thumb.jpg'
    },
    {
      src: '/assets/img/products/tea-loaf.jpg',
      thumb: '/assets/img/products/tea-loaf-thumb.jpg'
    },
    {
      src: '/assets/img/products/napoleonshat.jpg',
      thumb: '/assets/img/products/napoleonshat-thumb.jpg'
    },
    {
      src: '/assets/img/products/magdalena.jpg',
      thumb: '/assets/img/products/magdalena-thumb.jpg'
    }
  ];


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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

  openLightbox(index: number): void {
    this.lightbox.open(this.album, index, {
      centerVertically: true,
      positionFromTop: 0,
      disableScrolling: true,
      wrapAround: true
    });
  }

  close(): void {
    this.lightbox.close();
  }


}
