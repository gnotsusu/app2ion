import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Login} from "../login/login";
import {Auth} from "../../providers/auth";

/**
 * Generated class for the Document page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-document',
  templateUrl: 'document.html',
})
export class Document {
  private loading: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public auth: Auth,
              public loadingCtrl: LoadingController) {
    this.signOut();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Document');
  }

  public signOut() {

    this.showLoading();

    this.auth.clearAutherize().then(() => {
      this.loading.dismiss();
      this.nav.setRoot(Login);
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
