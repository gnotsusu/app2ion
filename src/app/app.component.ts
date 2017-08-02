
import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform, LoadingController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { Auth }from '../providers/auth';

export class Pages {
  title: string;
  icon: string;
  component: any;

  constructor(title: string, icon: string, component: any) {
    this.title = title;
    this.icon = icon;
    this.component = component;
  }
}

import {Login} from '../pages/login/login';
import {HomePage} from "../pages/home/home";
import {Complaint} from "../pages/complaint/complaint";
import {Report} from "../pages/report/report";
import {Result} from "../pages/result/result";
import {Tabs} from "../pages/tabs/tabs";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Login;
  pages: Array<Pages>;
  loading: any;

  constructor(
              public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              public auth: Auth,
              public loadingCtrl:LoadingController) {

    this.initializeApp();

    this.pages = [
      new Pages('หน้าหลัก', 'home', HomePage),
      new Pages('บันทึกเรื่องราวร้องทุกข์', 'paper-airplane', Complaint),
      new Pages('ผลการดำเนินงาน', 'email-unread', Result),
      new Pages('รายงาน', 'paper', Report)
      //new Pages('ออกจากระบบ', 'lock', Login)
    ];

  }

  private initializeApp() {

    this.platform.ready().then(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  public signOut(){
    this.menu.close();
    this.showLoading();

    this.auth.clearAutherize().then(()=> {
      this.loading.dismiss();
      this.nav.setRoot(Login);
    }).catch((err)=> {
      this.loading.dismiss();
      console.log(err.stack);
    })

  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content : 'กำลังออกจากระบบ...'
    });
    this.loading.present();
  }

}

