import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {UploadsComponent} from './uploads/uploads.component';
import {DashboardProfileComponent} from './profile/dashboard-profile.component';
import {DashboardCollectionsComponent} from './folders/dashboard-collections.component';
import {ProfileCollectionsItemsComponent} from './profile/profile-collections-items/profile-collections-items.component';
import {DashboardGuardService} from './dashboard-guard.service';
import {DashboardProfileGuardService} from './dashboard-profile-guard.service';
import {ProfileCollectionComponent} from '../../containers/pages/profile-collection/profile-collection.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent, canActivate: [DashboardGuardService],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboards'},
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboards/dashboards.module').then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: 'applications',
        loadChildren: () =>
          import('./applications/applications.module').then(
            (m) => m.ApplicationsModule
          ),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui',
        loadChildren: () => import('./ui/ui.module').then((m) => m.UiModule),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('./menu/menu.module').then((m) => m.MenuModule),
      },
      {path: 'blank-page', component: BlankPageComponent},
      {path: 'collections', component: DashboardCollectionsComponent},
      {path: 'collection/:collectionId', component: UploadsComponent},
      {path: 'profile', component: DashboardProfileComponent, canActivate: [DashboardProfileGuardService]},
      {
        path: 'profile/:username', component: DashboardProfileComponent, children: [
          {path: 'collections', component: ProfileCollectionComponent},
          {path: 'collections/:collectionId', component: ProfileCollectionsItemsComponent}
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
