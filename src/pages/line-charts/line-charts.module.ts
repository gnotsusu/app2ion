import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LineCharts } from './line-charts';

@NgModule({
  declarations: [
    LineCharts,
  ],
  imports: [
    IonicPageModule.forChild(LineCharts),
  ],
  exports: [
    LineCharts
  ]
})
export class LineChartsModule {}
