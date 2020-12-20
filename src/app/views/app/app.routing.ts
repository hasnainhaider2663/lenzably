import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {UploadsComponent} from './uploads/uploads.component';
import {ProfileComponent} from './profile/profile.component';
import {FoldersComponent} from './folders/folders.component';
import {ProfileCollectionsComponent} from './profile/profile-collections/profile-collections.component';
import {ProfileCollectionsItemsComponent} from './profile/profile-collections-items/profile-collections-items.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
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
      {path: 'collections', component: FoldersComponent},
      {path: 'collection/:collectionId', component: UploadsComponent},
      {
        path: 'profile/:username', component: ProfileComponent, children: [
          {path: '', component: ProfileCollectionsComponent},
          {path: 'collections/:collectionId', component: ProfileCollectionsItemsComponent},
          {path: ':/collectionId', redirectTo: '/collections/:collectionId'},
          {
            path: 'collections', component: ProfileCollectionsComponent
          }
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
