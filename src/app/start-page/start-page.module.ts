import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartPagePageRoutingModule } from './start-page-routing.module';

import { StartPagePage } from './start-page.page';
import { MainToolbarComponentModule } from '../_components/main-toolbar/main-toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StartPagePageRoutingModule,
    MainToolbarComponentModule
  ],
  declarations: [StartPagePage]
})
export class StartPagePageModule {}
