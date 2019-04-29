import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultState } from './result-state';

@NgModule({
  declarations: [
    ResultState,
  ],
  imports: [
    IonicPageModule.forChild(ResultState),
  ],
  exports: [
    ResultState
  ]
})
export class ResultStateModule {}
