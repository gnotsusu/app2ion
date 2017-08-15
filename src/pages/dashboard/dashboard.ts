import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ModalController, LoadingController} from 'ionic-angular';
import {DashboardService} from "../../providers/dashboard-service";
import {Login} from '../login/login';
import {Auth} from '../../providers/auth';
import {RequestOptions, Http, Headers, URLSearchParams} from '@angular/http';

/**
 * Generated class for the Step3 page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [DashboardService]
})
export class Dashboard {
  token: any;
  loading: any;
  page: number = 1;
  complaints: object[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadCtrl: LoadingController,
              public auth: Auth,
              public http: Http,
              public dashboardService: DashboardService,) {
    // for (let i = 0; i < 30; i++) {
    //   this.complaints.push( this.complaints.length );
    // }

  }

  ionViewDidLoad() {
    this.authen();
    this.dashboardService.ComplaintData(this.page).then((data) => {
      Object.keys(data).forEach((key) => {
        this.complaints.push(data[key]);
      });
    });
    this.page++;
    console.log(this.complaints);
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

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.dashboardService.ComplaintData(this.page).then((data) => {
        console.log(data);
        if (data[0].status !== false) {
          Object.keys(data).forEach((key) => {
            this.complaints.push(data[key]);
          });
        }
      }).catch(err => {
        console.error(err.message);
      });
      this.page++;
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
}
