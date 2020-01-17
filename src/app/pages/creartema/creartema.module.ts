import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreartemaPageRoutingModule } from './creartema-routing.module';

import { CreartemaPage } from './creartema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreartemaPageRoutingModule
  ],
  declarations: [CreartemaPage]
})
export class CreartemaPageModule {}
