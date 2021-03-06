import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProfileDetailsPage } from './pages/profile-details/profile-details.page';
import { LoguinPage } from './pages/loguin/loguin.page';

const routes: Routes = [
  //{ path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'profile-details',
    loadChildren: () => import('./pages/profile-details/profile-details.module').then(m => m.ProfileDetailsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

  ////////////////////////intento
  {
    path: 'login',
    loadChildren: () => import('./pages/loguin/loguin.module').then(m => m.LoguinPageModule)

  },

  {
    path: 'mis-grupos',
    loadChildren: () => import('./pages/mis-grupos/mis-grupos.module').then(m => m.MisGruposPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./pages/myprofile/myprofile.module').then(m => m.MyprofilePageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./pages/friends/friends.module').then(m => m.FriendsPageModule)
  },
  {
    path: 'add-friends',
    loadChildren: () => import('./pages/add-friends/add-friends.module').then(m => m.AddFriendsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'grupo-detail',
    loadChildren: () => import('./pages/grupo-detail/grupo-detail.module').then(m => m.GrupoDetailPageModule)
  },

  {

    path: 'creargrupo',
    loadChildren: () => import('./pages/creargrupo/creargrupo.module').then(m => m.CreargrupoPageModule)
  },
  {
    path: 'consejos',
    loadChildren: () => import('./pages/consejos/consejos.module').then( m => m.ConsejosPageModule)
  },
  {
    path: 'foro',
    loadChildren: () => import('./pages/foro/foro.module').then( m => m.ForoPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./pages/post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'creartema',
    loadChildren: () => import('./pages/creartema/creartema.module').then( m => m.CreartemaPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
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
