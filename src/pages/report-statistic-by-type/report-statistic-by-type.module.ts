import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportStatisticByType} from "./report-statistic-by-type";

@NgModule({
  declarations: [
    ReportStatisticByType,
  ],
  imports: [
    IonicPageModule.forChild(ReportStatisticByType),
  ],
  exports: [
    ReportStatisticByType
  ]
})
export class ReportStatisticByTypeModule{}
