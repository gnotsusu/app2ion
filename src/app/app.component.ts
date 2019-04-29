import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform, LoadingController, App, Events} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Auth} from '../providers/auth';

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
  image: any;

  constructor(id: string, name: string, group: any, image: any) {
    this.id = id;
    this.name = name;
    this.group = group;
    this.image = image
  }
}

import {Login} from '../pages/login/login';
// import { HomePage } from "../pages/home/home";
import {Step1} from '../pages/step-1/step-1';
import {Report} from "../pages/report/report";
// import { Dashboard } from './../pages/dashboard/dashboard';
import {Tabs} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Login;
  pages: Array<Pages>;
  loading: any;
  profile: Array<any> = [];
  public token: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              public auth: Auth,
              public app: App,
              public loadingCtrl: LoadingController,
              public events: Events) {

    this.initializeApp();

    this.authen();
    // console.log('token 1', this.token);
    events.subscribe('user:logged-in', () => {
      this.refreshMenu();
    });

  }

  private initializeApp() {

    this.platform.ready().then(() => {
      // console.log('token', this.token);
      // this.pages = [
      //   new Pages('หน้าหลัก', 'home', Tabs),
      //   // new Pages('หน้าหลัก', 'home', HomePage),
      //   new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
      //   // new Pages('ผลการดำเนินงาน', 'clipboard', Dashboard),
      //   new Pages('รายงาน', 'paper', Report),
      //   //new Pages('ออกจากระบบ', 'lock', Login)
      // ];
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  public authen() {
    //this.showLoading();
    this.auth.isCheck().then((data) => {
      this.token = data;

      return data;
    }).then((token: string) => {
      return this.auth.isExpire(token);
    }).then((isExpire: Boolean) => {
      if (isExpire) {
        // this.loading.dismiss();
        // this.nav.popToRoot();
      } else {
        this.auth.getUserProfile().then((data) => {
          // console.log('da');
          // console.log(data['user']);
          return data['user'];
        }).then((data) => {
          switch (data.curentgroup) {
            case 'admin': {
              this.pages = [
                new Pages('หน้าหลัก', 'home', Tabs),
                new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
                new Pages('รายงาน', 'paper', Report),
              ];
              break;
            }
            case 'manager': {
              this.pages = [
                new Pages('รายงาน', 'paper', Report)
              ];
              break;
            }
            default: {
              this.pages = [
                new Pages('หน้าหลัก', 'home', Tabs),
                new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
              ];
              break;
            }
          }
          // console.log('data', data.curentgroup);
          // if (data.curentgroup == 'admin') {
          //   // console.log('a');
          //   this.pages = [
          //     new Pages('หน้าหลัก', 'home', Tabs),
          //     // new Pages('หน้าหลัก', 'home', HomePage),
          //     new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
          //     // new Pages('ผลการดำเนินงาน', 'clipboard', Dashboard),
          //     new Pages('รายงาน', 'paper', Report),
          //     //new Pages('ออกจากระบบ', 'lock', Login)
          //   ];
          // } else {
          //   // console.log('b');
          //   this.pages = [
          //     new Pages('หน้าหลัก', 'home', Tabs),
          //     // new Pages('หน้าหลัก', 'home', HomePage),
          //     new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
          //     // new Pages('ผลการดำเนินงาน', 'clipboard', Dashboard),
          //     // new Pages('รายงาน', 'paper', Report),
          //     //new Pages('ออกจากระบบ', 'lock', Login)
          //   ];
          // }
          this.profile.push(new UserData(
            data['id'],
            data['first_name'],
            '',
            data['photo']
          ));
        });
        return this.profile;
        // this.loading.dismiss();
      }
    }).catch(err => {
      // this.loading.dismiss();
      console.error(err);
    });
  }

  public openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //console.log('page', page.icon);
    // if (page.icon == 'filing' || page.icon == 'paper') {
    //   this.nav.setRoot(Tabs, { page: page.component });
    // } else {
    //   this.nav.setRoot(page.component);
    // }
    //this.nav.setRoot(Tabs);
    //this.nav.push(page.component);
    //this.app.getRootNav().push(page.component);
    //this.rootPage = Tabs;
    this.app.getRootNav().push(page.component);

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

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังออกจากระบบ...'
    });
    this.loading.present();
  }

  private refreshMenu() {
    this.auth.getUserProfile().then((data) => {
      return data['user'];
    }).then((data) => {
      switch (data.curentgroup) {
        case 'admin': {
          this.pages = [
            new Pages('หน้าหลัก', 'home', Tabs),
            new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
            new Pages('รายงาน', 'paper', Report),
          ];
          break;
        }
        case 'manager': {
          this.pages = [
            new Pages('รายงาน', 'paper', Report)
          ];
          break;
        }
        default: {
          this.pages = [
            new Pages('หน้าหลัก', 'home', Tabs),
            new Pages('บันทึกเรื่องราวร้องทุกข์', 'filing', Step1),
          ];
          break;
        }
      }
      this.profile.push(new UserData(
        data['id'],
        data['first_name'],
        '',
        data['photo']
      ));
    }).catch(err => {
      console.error(err);
    });
  }
}

