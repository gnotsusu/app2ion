import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the AddPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-photo',
  templateUrl: 'add-photo.html',
})
export class AddPhoto {
  base64Image:any;
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPhoto');
  }

  takePhoto(){
    this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.CAMERA,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }
  accessGallery(){
    this.camera.getPicture({
     sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
     destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
     }, (err) => {
      console.log(err);
    });
  }

  closeModal() {
      this.viewCtrl.dismiss('closeModal:add-photo');
      //this.viewCtrl.dismiss();
  }

}
