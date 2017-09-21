import { Login } from './../login/login';
import { Step5 } from './../step-5/step-5';
import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AddPhoto } from '../add-photo/add-photo';
import { Auth } from '../../providers/auth';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';

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
  token: any;
  loading: any;
  public hostList = 'http://123.242.172.133/sysdamrongdham/Result_attach_file/getPhoto/';
  public hostDelete = 'http://123.242.172.133/sysdamrongdham/Result_attach_file/deletePhoto/';
  public keyin_id = '';
  public host = 'http://123.242.172.133/sysdamrongdham';
  public api_keyin = this.host + '/api/complaint/key_in';


  public imageURL;
  public base64Image: any;
  public icons: string[];
  public items: Array<{ id: string, src: string }>;
  constructor(private alertCtrl: AlertController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public camera: Camera, public http: Http, public auth: Auth, public loadCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Step4');
    this.authen();
    this.keyin_id = this.navParams.get('param1');
    this.showListImage();

    //console.log(itemList);
  }

  showListImage() {
    return new Promise((resolve, reject) => {
      this.http.get(this.hostList + this.keyin_id).map(res => res.json()).subscribe(
        data => {
          this.items = data;
          //console.log(this.items);
        },
        err => {
          reject(err);
        })
    })
  }
  authen() {

    this.showLoading();

    this.auth.isCheck().then((data) => {
      this.token = data;

      return data;
    }).then((token: string) => {
      return this.auth.isExpire(token);
    }).then((isExpire: Boolean) => {
      if (isExpire) {
        this.loading.dismiss();
        this.navCtrl.pop(Login);
      } else {
        this.loading.dismiss();
      }
    }).catch(err => {
      this.loading.dismiss();
      console.error(err.message);
    });
  }

  showLoading() {
    this.loading = this.loadCtrl.create({
      content: 'กำลังยื่นยันตัวตน...'
    });
    this.loading.present();
  }

  openModal() {
    let myModal = this.modalCtrl.create(AddPhoto, { id: this.keyin_id });
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

  saveData() {
    let token_data = this.token;
    let keyin_id = this.keyin_id;
    console.log('token');
    console.log(token_data);
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token_data);
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let body = new URLSearchParams();
      body.set('step', '5');
      body.set('keyin_id', this.keyin_id.toString());

      let options = new RequestOptions({ headers: headers });
      this.http.put(this.api_keyin, body, options).map(res => res).subscribe(
        data => {
          this.navCtrl.push(Step5, { param1: this.keyin_id });
        },
        err => {
          console.log('Http Error');
          reject(err);
        }
      );

    });


  }


}
