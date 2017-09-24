import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class Reports {

  host: string = "http://123.242.172.133/sysdamrongdham/";
  reportType: string = this.host + "api/report/report_test_app";

  constructor(public http: Http) {
    console.log("Hello Report Provider ");
  }

  getReport(token:string){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      let options = new RequestOptions({headers: headers});
      console.log(this.reportType);
      this.http.get(this.reportType, options).map(res => res.json()).subscribe( data => {
          resolve(data);
      }, err => {
        reject(err);
      })
    });
  }

  reportStatistic = this.host + "api/report/report_statistic_by_type_app";
  getReportStatitic(token:string){
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', 'Bearer ' + token);
      let options = new RequestOptions({headers: headers});

      this.http.get(this.reportStatistic, options).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      })
    });
  }

}
