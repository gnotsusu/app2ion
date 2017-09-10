import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the DashboardService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DashboardService {

  host: string = "http://123.242.172.133/sysdamrongdham";
  apiCountComplaint: string = this.host + "/api/complaint/count";
  apiComplaint: string = this.host + "/api/complaint/dashboard_mobile/";
  dashboardApi: string = this.host + "/api/complaint/dashboard/1";
  dashboardCountApi: string = this.host + "/api/complaint/total_status_row";
  token: string;
  complaints: object[] = [];
  countComplaints: object[] = [];
  countComplaintsStatus: object[] = [];

  constructor(public http: Http, public storage: Storage) {
    //console.log('Hello DashboardService Provider');
  }

  ComplaintData(page) {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((data: string) => {
        this.token = data;
        return data;
      }).then((token: string) => {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.apiComplaint + page, options).map(res => res.json()).subscribe(
          (data) => {
            this.complaints = data;
            resolve(this.complaints);
          }, (err) => {
            reject({});
          });
      }).catch((err: string) => {
        reject(err);
      });
    });
  }

  getDashboardlist(token: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.dashboardApi)
        .map(res => res.json())
        .subscribe()
    });
  }

  getDashboardCountlist() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((data: string) => {
        this.token = data;
        return data;
      }).then((token: string) => {
        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        let options = new RequestOptions({ headers: headers });
        this.http.get(this.dashboardCountApi, options).map(res => res.json()).subscribe(
          (data) => {
            this.countComplaintsStatus = data;
            resolve(this.countComplaintsStatus);
          }, (err) => {
            reject({});
          });
      }).catch((err: string) => {
        reject(err);
      });
    });
  }

}
