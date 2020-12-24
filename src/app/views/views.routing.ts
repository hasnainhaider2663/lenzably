import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { UserRole } from '../shared/auth.roles';
import {ProductComponent} from "./product/product.component";
import {ProfileComponent} from "./profile/profile.component";
import {HomeCopyComponent} from "./home-copy/home-copy.component";
import {ArtistsComponent} from "./artists/artists.component";
import {CollectionItemsComponent} from "./collection-items/collection-items.component";
import {LbOrdersComponent} from "./lb-orders/lb-orders.component";

const adminRoot = environment.adminRoot.substr(1); // path cannot start with a slash

let routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: adminRoot
  // },
  {
    path: adminRoot,
    loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
    data: { roles: [UserRole.Admin, UserRole.Editor] },
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  { path: 'error', component: ErrorComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '/error' },
];

if (!environment.isAuthGuardActive) {
  routes = [
    {
      path: '',
      component: HomeComponent,
      pathMatch: 'full',
    },
    {
      path: 'home-copy',
      component: HomeCopyComponent,
      pathMatch: 'full',
    },
    {
      path: 'product',
      component: ProductComponent,
      pathMatch: 'full',
    },
    {
      path: 'profile',
      component: ProfileComponent,
      pathMatch: 'full',
    },
    {
      path: 'profile/collection',
      component: CollectionItemsComponent,
      pathMatch: 'full',
    },
    {
      path: 'artists',
      component: ArtistsComponent,
      pathMatch: 'full',
    },
    {
      path: 'orders',
      component: LbOrdersComponent,
      pathMatch: 'full',
    },
    {
      path: 'app',
      loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
    },
    {
      path: 'user',
      loadChildren: () =>
        import('./user/user.module').then((m) => m.UserModule),
    },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error' },
  ];
}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
