import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, AlertController, Events} from 'ionic-angular';
import * as JWT from 'jwt-decode';
import _ from 'lodash';
import {Auth} from '../../providers/auth';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Tabs} from "../tabs/tabs";
import {Report} from "../report/report";

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
  loading: any;
  token: string = "";
  userDataId: any;

  constructor(public navCtrl: NavController,
              public http: Http,
              public navParams: NavParams,
              public auth: Auth,
              public loadCtrl: LoadingController,
              public alertCtrl: AlertController,
              public events: Events) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Login');
    this.authen();
  }

  authen() {

    this.showLoading();

    this.auth.isCheck().then((data) => {
      return data;
    }).then((token: string) => {
      return this.auth.isExpire(token);
    }).then((isExpire: Boolean) => {
      if (isExpire) {
        this.loading.dismiss();
        this.presentAlert();
      } else {
        this.loading.dismiss();
        this.navCtrl.push(Tabs);
      }
    }).catch(err => {
      this.loading.dismiss();
      console.error(err);
    });
  }

  signIn() {
    this.showLoading();
    // console.log('Login Start');
    let credentials = {
      username: this.username,
      password: this.password
    };

    this.auth.login(credentials).then(res => {
      // console.log('User created!');
      this.events.publish('user:logged-in');
      this.loading.dismiss();
      let user:any = JWT(res.toString());
      if(!_.isUndefined(user.group) && _.isEqual('manager',user.group.toString())){
        this.navCtrl.push(Report);
      }else {
        this.navCtrl.push(Tabs);
      }
    }).catch((err) => {
      console.log(err);
      this.loading.dismiss();
      let alert = this.alertCtrl.create({
        title: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        buttons: ['ตกลง']
      });
      alert.present();
    });

  }

  showLoading() {
    this.loading = this.loadCtrl.create({
      content: 'กำลังยื่นยันตัวตน...'
    });
    this.loading.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "ระยะเวลาอยู่ในระบบของคุณหมดอายุ",
      subTitle: "กรุณาเข้าสู่ระบบอีกครั้ง",
      buttons: ['ตกลง']
    });
    alert.present();
  }

  forgetPass() {
    let alert = this.alertCtrl.create({
      title: "ลืมรหัสผ่าน",
      subTitle: "กรุณากรอกชื่อผู้ใช้ อีเมล์และเลขประจำตัวประชาชน",
      inputs: [{name: 'username', placeholder: 'ชื่อผู้ใช้'}, {name: 'email', placeholder: 'อีเมล์'}, {
        name: 'id_card',
        placeholder: 'เลขประจำตัวประชาชน'
      }],
      buttons: [{
        text: 'ตกลง', handler: (data) => {
          this.checkUserData(data)
        }
      }, {text: 'ยกเลิก'}]
    });
    alert.present();
  }

  checkUserData(data) {
    this.auth.getUserData(data.username, data.email, data.id_card).then((dataUser) => {
      this.userDataId = dataUser;
      if (this.userDataId != '') {
        this.rePassword(this.userDataId);
      } else {
        let alert = this.alertCtrl.create({
          title: "เกิดข้อผิดพลาด",
          subTitle: "ไม่พบข้อมูล",
          buttons: [{text: 'ตกลง'}]
        });
        alert.present();
      }
    });

  }

  rePassword(userId) {
    let alert = this.alertCtrl.create({
      title: "กรอกรหัสผ่านใหม่",
      subTitle: "กรุณากรอกรหัสผ่านที่ท่านต้องการ",
      inputs: [{name: 'userId', value: userId, type: 'hidden'}, {
        name: 'repassword',
        placeholder: 'รหัสผ่านใหม่',
        type: 'password'
      }, {name: 'repassword2', placeholder: 'ยืนยันรหัสผ่าน', type: 'password'}],
      buttons: [{
        text: 'ตกลง', handler: (data) => {
          this.rePasswordSave(data)
        }
      }, {text: 'ยกเลิก'}]
    });
    alert.present();
  }

  rePasswordSave(data) {
    this.auth.saveRepassword(data.userId, data.repassword, data.repassword2).then((dataUser) => {
      this.userDataId = dataUser;
      let txt_title = '';
      let txt_subTitle = '';
      if (dataUser == 'error') {
        txt_title = 'เกิดข้อผิดพลาด';
        txt_subTitle = 'กรุณากรอกรหัสผ่านให้ตรงกัน'
      } else {
        txt_title = 'สำเร็จ';
        txt_subTitle = 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว'
      }
      let alert = this.alertCtrl.create({
        title: txt_title,
        subTitle: txt_subTitle,
        buttons: [{text: 'ตกลง',}]
      });
      alert.present();
    });
  }
}
