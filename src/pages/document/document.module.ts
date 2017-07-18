import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Document } from './document';

@NgModule({
  declarations: [
    Document,
  ],
  imports: [
    IonicPageModule.forChild(Document),
  ],
  exports: [
    Document
  ]
})
export class DocumentModule {}
