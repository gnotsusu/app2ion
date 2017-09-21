import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Step4 } from './step-4';

@NgModule({
  declarations: [
    Step4,
  ],
  imports: [
    IonicPageModule.forChild(Step4),
  ],
  exports: [
    Step4
  ]
})
export class Step4Module {}
