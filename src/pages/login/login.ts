import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {Auth} from '../../providers/auth';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Tabs} from "../tabs/tabs";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public username: string;
  public password: string;
  loading : any;
  token:string = "";

  constructor(public navCtrl: NavController,
              public http: Http,
              public navParams: NavParams,
              public auth: Auth,
              public loadCtrl : LoadingController,
              public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    this.authen();
  }

  authen(){

    this.showLoading();

    this.auth.isCheck().then((data) => {
        return data;
    }).then( (token:string) => {
        return this.auth.isExpire(token);
    }).then((isExpire:Boolean) => {
      if (isExpire ) {
        this.loading.dismiss();
        this.presentAlert();
      } else {
        this.loading.dismiss();
        this.navCtrl.push(Tabs);
      }
    }).catch(err => {
      this.loading.dismiss();
      console.error(err.message);
    });
  }

  signIn() {
    this.showLoading();
    console.log('Login Start');
    let credentials = {
      username: this.username,
      password: this.password
    };

    this.auth.login(credentials).then(res => {
      console.log(res);
      this.loading.dismiss();
      this.navCtrl.push(Tabs);
    }).catch((err) => {
      this.loading.dismiss();
      alert('username or password failure!');
    });

  }

  showLoading(){
    this.loading = this.loadCtrl.create({
      content : 'กำลังยื่นยันตัวตน...'
    });
    this.loading.present();
  }

  presentAlert(){
    let alert = this.alertCtrl.create({
      title: "ระยะเวลาอยู่ในระบบของคุณหมดอายุ",
      subTitle: "กรุณาเข้าสู่ระบบอีกครั้ง",
      buttons: ['ตกลง']
    });
    alert.present();
  }

}
