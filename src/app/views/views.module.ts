import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './views.routing';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadroomModule } from '@ctrl/ngx-headroom';
import { HomeComponent } from './home/home.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AuthGuard } from '../shared/auth.guard';
import { ProductComponent } from './product/product.component';
import {LayoutContainersModule} from '../containers/layout/layout.containers.module';
import {PagesContainersModule} from '../containers/pages/pages.containers.module';
import {FormsModule} from '@angular/forms';
import { HomeCopyComponent } from './home-copy/home-copy.component';
import { ProfileComponent } from './profile/profile.component';
import {DashboardsContainersModule} from '../containers/dashboards/dashboards.containers.module';
import {NgSelectModule} from '@ng-select/ng-select';
import { ArtistsComponent } from './artists/artists.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { CollectionItemsComponent } from './collection-items/collection-items.component';
import { LbOrdersComponent } from './lb-orders/lb-orders.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { LbOrderDetailsComponent } from './lb-order-details/lb-order-details.component';
@NgModule({
  declarations: [HomeComponent, ProductComponent, HomeCopyComponent, ProfileComponent, ArtistsComponent, CollectionItemsComponent, LbOrdersComponent, LbOrderDetailsComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    ComponentsCarouselModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    HeadroomModule,
    ScrollToModule.forRoot(),
    LayoutContainersModule,
    PagesContainersModule,
    FormsModule,
    DashboardsContainersModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    NgxDatatableModule,
  ],
  providers: [AuthGuard],
})
export class ViewsModule {}
