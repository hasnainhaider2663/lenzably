import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {BlankPageComponent} from './blank-page/blank-page.component';
import {UploadsComponent} from "./uploads/uploads.component";
import {ProfileComponent} from "./profile/profile.component";
import {FoldersComponent} from "./folders/folders.component";

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
      {path: 'folders', component: FoldersComponent},
      {path: 'uploads', component: UploadsComponent},
      {path: 'profile', component: ProfileComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
