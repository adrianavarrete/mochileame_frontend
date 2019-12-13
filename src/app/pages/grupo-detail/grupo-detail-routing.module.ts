import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrupoDetailPage } from './grupo-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GrupoDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrupoDetailPageRoutingModule {}
