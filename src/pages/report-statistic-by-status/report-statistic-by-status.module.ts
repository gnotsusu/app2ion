import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportStatisticByStatus } from "./report-statistic-by-status";


@NgModule({
  declarations: [
    ReportStatisticByStatus,
  ],
  imports: [
    IonicPageModule.forChild(ReportStatisticByStatus),
  ],
  exports: [
    ReportStatisticByStatus
  ]
})
export class ReportStatisticByStatusModule{}
