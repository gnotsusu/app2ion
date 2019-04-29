import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class Reports {

  host: string = "http://123.242.172.133/sysdamrongdham/";

  constructor(public http: Http) {
    console.log("Hello Report Provider ");
  }

  reportByType: string = this.host + "api/report/report_test_app";
  getReport(token:string){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      let options = new RequestOptions({headers: headers});
      this.http.get(this.reportByType, options).map(res => res.json()).subscribe( data => {
          resolve(data);
      }, err => {
        reject(err);
      })
    });
  }

  reportStatisticByType = this.host + "api/report/report_statistic_by_type_app";
  getReportStatitic(token:string){
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      let options = new RequestOptions({headers: headers});

      this.http.get(this.reportStatisticByType, options).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    });
  }

  reportStatisticByStatus = this.host + "api/report/report_statistic_by_status_app";
  getReportStatiticByStatus(token:string){
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      let options = new RequestOptions({headers: headers});

      this.http.get(this.reportStatisticByStatus, options).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    });
  }

  reportAllComplaint = this.host + "api/report/report_all_complaint_app";
  getReportAllComplaint(token:string){
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      let options = new RequestOptions({headers: headers});

      this.http.get(this.reportAllComplaint, options).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    });
  }

}
