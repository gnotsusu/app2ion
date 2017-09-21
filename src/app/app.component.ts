import { User } from './../providers/auth';
import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from '../providers/auth';

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

export class UserData {
  id: string;
  name: string;
  group: any;
  image: any

  constructor(id: string, name: string, group: any, image: any) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.image = image
  }
}

import { Login } from '../pages/login/login';
import { HomePage } from "../pages/home/home";
import { Step1 } from './../pages/step-1/step-1';
import { Report } from "../pages/report/report";
import { Dashboard } from './../pages/dashboard/dashboard';
import { Tabs } from "../pages/tabs/tabs";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Login;
  pages: Array<Pages>;
  loading: any;
  test: Array<any> = [];
  public token: any;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public menu: MenuController,
    public auth: Auth,
    public loadingCtrl: LoadingController) {

    this.initializeApp();
    this.pages = [
      new Pages('หน้าหลัก', 'home', Tabs)
      // new Pages('หน้าหลัก', 'home', HomePage),
      // new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
      // new Pages('ผลการดำเนินงาน', 'clipboard', Dashboard),
      // new Pages('รายงาน', 'paper', Report)
      //new Pages('ออกจากระบบ', 'lock', Login)
    ];
    this.authen();
    //this.test = this.auth.getUserProfile();
    //console.log('a');
    console.log(this.test);

  }

  private initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
  authen() {
    //this.showLoading();
    this.auth.isCheck().then((data) => {
      this.token = data;
      return data;
    }).then((token: string) => {
      return this.auth.isExpire(token);
    }).then((isExpire: Boolean) => {
      if (isExpire) {
        // this.loading.dismiss();
        this.nav.pop(Login);
      } else {
        this.auth.getUserProfile().then((data) => {
          // console.log('da');
          // console.log(data['user']);
          return data['user'];
        }).then((data) => {
          this.test.push(new UserData(
            data['id'],
            data['first_name'],
            '',
            data['photo']
          ));
          console.log('sa');
          console.log(this.test);
          // return this.test
        });
        //this.test = this.test[0];
        return this.test;
        // this.loading.dismiss();
      }
    }).catch(err => {
      // this.loading.dismiss();
      console.error(err.message);
    });
  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  public signOut() {
    this.menu.close();
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

}

