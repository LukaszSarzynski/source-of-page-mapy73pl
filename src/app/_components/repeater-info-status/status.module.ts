import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { RepeaterInfoStatusComponent } from './status.component';


@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule],
  declarations: [RepeaterInfoStatusComponent],
  exports: [RepeaterInfoStatusComponent]
})
export class RepeaterInfoStatusComponentModule {}



