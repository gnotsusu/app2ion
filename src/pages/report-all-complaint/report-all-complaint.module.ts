import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ReportAllComplaint} from "./report-all-complaint";

@NgModule({
  declarations: [
    ReportAllComplaint,
  ],
  imports: [
    IonicPageModule.forChild(ReportAllComplaint),
  ],
  exports: [
    ReportAllComplaint
  ]
})
export class ReportAllComplaintModule{}
