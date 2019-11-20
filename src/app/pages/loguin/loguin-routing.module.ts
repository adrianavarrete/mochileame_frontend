import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoguinPage } from './loguin.page';

const routes: Routes = [
  {
    path: '',
    component: LoguinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoguinPageRoutingModule {}
