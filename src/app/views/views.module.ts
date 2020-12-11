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
import {LayoutContainersModule} from "../containers/layout/layout.containers.module";
import {PagesContainersModule} from "../containers/pages/pages.containers.module";
import {FormsModule} from "@angular/forms";
import { HomeCopyComponent } from './home-copy/home-copy.component';
import { ProfileComponent } from './profile/profile.component';
import {DashboardsContainersModule} from "../containers/dashboards/dashboards.containers.module";
import {NgSelectModule} from "@ng-select/ng-select";
@NgModule({
  declarations: [HomeComponent, ProductComponent, HomeCopyComponent, ProfileComponent],
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
  ],
  providers: [AuthGuard],
})
export class ViewsModule {}
