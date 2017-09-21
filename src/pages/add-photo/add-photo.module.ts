import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhoto } from './add-photo';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    AddPhoto,
  ],
  imports: [
    IonicPageModule.forChild(AddPhoto),
  ],
  exports: [
    AddPhoto
  ]
})
export class AddPhotoModule {}
