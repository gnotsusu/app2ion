import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ReportStatistic} from "./report-statistic";

@NgModule({
  declarations: [
    ReportStatistic,
  ],
  imports: [
    IonicPageModule.forChild(ReportStatistic),
  ],
  exports: [
    ReportStatistic
  ]
})
export class ReportStatisticModule{}
