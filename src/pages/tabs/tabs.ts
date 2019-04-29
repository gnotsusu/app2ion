import { Auth } from './../../providers/auth';
import { Login } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events, AlertController, LoadingController } from 'ionic-angular';
import { Document } from '../document/document';
import { HomePage } from "../home/home";
import { Report } from "../report/report";


/**
 * Generated class for the Tabs tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
@IonicPage()
export class Tabs {

  tab1Root: any = HomePage;
  // tab2Root: any = Report;
  //tab3Root: any = Logout;
  loading: any;
  pageParam: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appCtrl: App,
    public event: Events,
    public alert: AlertController,
    public auth: Auth,
    public loadingCtrl: LoadingController,
  ) {
    this.pageParam = this.navParams.get('page');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
    if (typeof this.pageParam != 'undefined') {
      //console.log('pages', this.pageParam);
      //this.navCtrl.setRoot(this.pageParam);
      //console.log('this.appCtrl.getRootNav()', this.appCtrl.getRootNav());
      //this.appCtrl.getRootNav().push(this.pageParam);
      //this.navCtrl.
    }
  }

  /*logout() {
    let alert = this.alert.create({
      title: "Log-out ?",
      message: 'Are you sure you want to log-out?',
      buttons: [{
        text: 'No',
        handler: () => {
          console.log('No clicked')
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.appCtrl.getRootNav().setRoot(Login);
          this.auth.clearAutherize().then(() => {
            this.loading.dismiss();
            this.nav.setRoot(Login);
          }).catch((err) => {
            this.loading.dismiss();
            console.log(err.stack);
          })
        }
      }
      ]
    });
    alert.present();
  }*/
  public logout() {
    this.showLoading();

    this.auth.clearAutherize().then(() => {
      this.loading.dismiss();
      this.navCtrl.setRoot(Login);
    }).catch((err) => {
      this.loading.dismiss();
      console.log(err.stack);
    })

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังออกจากระบบ...'
    });
    this.loading.present();
  }

}
