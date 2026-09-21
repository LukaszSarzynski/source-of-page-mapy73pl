import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RepeaterInfoComponent } from './repeater-info.component';
// import { RepeaterInfoStatusComponent } from './status/status.component';
import { RepeaterInfoActivationComponent } from './activation/activation.component';
import { RepeaterInfoCrossBandsComponent } from './cross-band/cross-band.component';
import { RepeaterInfoTypeComponentModule } from '../repeater-info-type/type.module';
import { RepeaterInfoStatusComponentModule } from '../repeater-info-status/status.module';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule, RepeaterInfoTypeComponentModule, RepeaterInfoStatusComponentModule],
  // declarations: [RepeaterInfoComponent, RepeaterInfoStatusComponent, RepeaterInfoTypeComponent,RepeaterInfoActivationComponent],
  declarations: [RepeaterInfoComponent, RepeaterInfoCrossBandsComponent,RepeaterInfoActivationComponent], 
  exports: [RepeaterInfoComponent, RepeaterInfoCrossBandsComponent]
})
export class RepeaterInfoComponentModule {}



