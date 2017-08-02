import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Step1 } from './step-1';

@NgModule({
  declarations: [
    Step1,
  ],
  imports: [
    IonicPageModule.forChild(Step1),
  ],
  exports: [
    Step1
  ]
})
export class Step1Module {}
