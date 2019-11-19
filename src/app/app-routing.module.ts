import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileDetailsPage } from './pages/profile-details/profile-details.page';

const routes: Routes = [
  //{ path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'profile-details',
    loadChildren: () => import('./pages/profile-details/profile-details.module').then(m => m.ProfileDetailsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
