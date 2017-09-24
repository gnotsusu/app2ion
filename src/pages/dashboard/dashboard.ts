import { Step2 } from './../step-2/step-2';
import { Step3 } from './../step-3/step-3';
import { Step4 } from './../step-4/step-4';
import { Step1 } from './../step-1/step-1';
import { Step5 } from './../step-5/step-5';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { DashboardService } from "../../providers/dashboard-service";
import { Login } from '../login/login';
import { Auth } from '../../providers/auth';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import * as moment from 'moment';

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
  status_id: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public auth: Auth,
    public http: Http,
    public dashboardService: DashboardService, ) {
    moment.locale('th');
  }

  ionViewDidLoad() {
    this.authen();
    this.status_id = this.navParams.get('status_id');
    this.dashboardService.ComplaintData(this.page, this.status_id).then((data) => {
      Object.keys(data).forEach((key) => {
        let now = moment(data[key].complain_date);
        data[key].complain_date = now.format('d MMM ') + (now.get('year') + 543) + now.format(' เวลา h:mm:ss น.');
        this.complaints.push(data[key]);
      });
    });
    this.page++;
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

  goToDetail(keyin_id, step) {
    console.log(keyin_id);
    if (step == '1') {
      this.navCtrl.push(Step2, { param1: keyin_id });
    } else if (step == '2') {
      this.navCtrl.push(Step3, { param1: keyin_id });
    } else if (step == '3') {
      this.navCtrl.push(Step3, { param1: keyin_id });
    } else if (step == '4') {
      this.navCtrl.push(Step5, { param1: keyin_id });
    } else {
      this.navCtrl.push(Step5, { param1: keyin_id });
    }


  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.dashboardService.ComplaintData(this.page, this.status_id).then((data) => {
        if (data[0].status !== false) {
          Object.keys(data).forEach((key) => {
            let now = moment(data[key].complain_date);
            data[key].complain_date = now.format('d MMM ') + (now.get('year') + 543) + now.format(' เวลา h:mm:ss น.');
            this.complaints.push(data[key]);
          });
        }
      }).catch(err => {
        console.error(err.message);
      });
      this.page++;
      infiniteScroll.complete();
    }, 500);
  }
}
