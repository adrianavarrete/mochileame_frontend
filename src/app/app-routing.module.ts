import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileDetailsPage } from './profile-details/profile-details.page';

const routes: Routes = [
  { path: '', redirectTo: 'profile-details', pathMatch: 'full' },
  {
    path: 'profile-details',
    loadChildren: () => import('./profile-details/profile-details.module').then(m => m.ProfileDetailsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
