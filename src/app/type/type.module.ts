import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypePageRoutingModule } from './type-routing.module';

import { TypePage } from './type.page';
import { MainToolbarComponentModule } from '../_components/main-toolbar/main-toolbar.module';
import { RepeaterInfoStatusComponentModule } from '../_components/repeater-info-status/status.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypePageRoutingModule,
    MainToolbarComponentModule,
    RepeaterInfoStatusComponentModule
  ],
  declarations: [TypePage]
})
export class TypePageModule {}
