import { Step5 } from './../step-5/step-5';
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
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

  public hostList = 'http://123.242.172.133/sysdamrongdham/Result_attach_file/getPhoto/';
  public hostDelete = 'http://123.242.172.133/sysdamrongdham/Result_attach_file/deletePhoto/';
  public keyid_id = 176;

  public imageURL;
  public base64Image: any;
  public icons: string[];
  public items: Array<{ id: string, src: string }>;
  constructor(private alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step4');
    this.showListImage();
    //console.log(itemList);
  }

  showListImage() {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostList + this.keyid_id).map(res => res.json()).subscribe(
        data => {
          this.items = data;
          //console.log(this.items);
        },
        err => {
          reject(err);
        })
    })
  }

  openModal() {
    let myModal = this.modalCtrl.create(AddPhoto, { id: this.keyid_id });
    myModal.onDidDismiss(data => {
      this.showListImage();
      //console.log(data);
    });
    myModal.present();
  }

  deleteImage(id) {
    let image_id = id;
    let alert = this.alertCtrl.create({
      title: 'ยืนยัน',
      message: 'ต้องการลบรูปภาพนี้ใช่หรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ตกลง',
          handler: () => {
            //console.log('Buy:'+image_id);
            this.deletePhoto(image_id);
          }
        }
      ]
    });
    alert.present();
  }

  deletePhoto(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostDelete + id).map(res => res.text()).subscribe(
        data => {
          this.showListImage();
          //console.log(data);
        },
        err => {
          reject(err);
        })
    })
  }


}
