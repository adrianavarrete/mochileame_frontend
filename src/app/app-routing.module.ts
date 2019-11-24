import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileDetailsPage } from './pages/profile-details/profile-details.page';
import {LoguinPage} from './pages/loguin/loguin.page';

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
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },

  ////////////////////////intento
{
    path: 'login',
    loadChildren: () => import('./pages/loguin/loguin.module').then(m => m.LoguinPageModule)

},
  {
    path: 'mis-grupos',
    loadChildren: () => import('./pages/mis-grupos/mis-grupos.module').then( m => m.MisGruposPageModule)
  },
  {
    path: 'mis-grupos',
    loadChildren: () => import('./pages/mis-grupos/mis-grupos.module').then( m => m.MisGruposPageModule)
  }

  /////////////////

];





@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
