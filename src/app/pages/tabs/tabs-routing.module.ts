import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../profile-details/profile-details.module').then(m => m.ProfileDetailsPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../mis-grupos/mis-grupos.module').then(m => m.MisGruposPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab3',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
