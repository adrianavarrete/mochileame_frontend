import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreartemaPage } from './creartema.page';

const routes: Routes = [
  {
    path: '',
    component: CreartemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreartemaPageRoutingModule {}
