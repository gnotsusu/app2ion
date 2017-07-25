import { Step5 } from './../step-5/step-5';
import { Component } from '@angular/core';
import { ModalController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AddPhoto } from '../add-photo/add-photo';

/**
 * Generated class for the Step4 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-step-4',
  templateUrl: 'step-4.html',
})
export class Step4 {
  step5Page = Step5;
  imageURL;
  base64Image:any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams,public camera:Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step4');
  }
  /*
  goToAddPhoto(){
    this.navCtrl.push(AddPhoto);
  }*/

  openModal() {
    let myModal = this.modalCtrl.create(AddPhoto);
    myModal.onDidDismiss(data => {
     console.log(data);
    });
    myModal.present();
  }


}
