import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonusCharts } from './donus-charts';

@NgModule({
  declarations: [
    DonusCharts,
  ],
  imports: [
    IonicPageModule.forChild(DonusCharts),
  ],
  exports: [
    DonusCharts
  ]
})
export class DonusChartsModule {}
