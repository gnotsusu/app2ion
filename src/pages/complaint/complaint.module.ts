import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Complaint } from './complaint';

@NgModule({
  declarations: [
    Complaint,
  ],
  imports: [
    IonicPageModule.forChild(Complaint),
  ],
  exports: [
    Complaint
  ]
})
export class ComplaintModule {}
