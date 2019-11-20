import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoguinPageRoutingModule } from './loguin-routing.module';

import { LoguinPage } from './loguin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoguinPageRoutingModule
  ],
  declarations: [LoguinPage]
})
export class LoguinPageModule {}
