import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoDetailPageRoutingModule } from './grupo-detail-routing.module';

import { GrupoDetailPage } from './grupo-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoDetailPageRoutingModule
  ],
  declarations: [GrupoDetailPage]
})
export class GrupoDetailPageModule {}
