import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {DonusCharts} from "../pages/donus-charts/donus-charts";
import {LineCharts} from "../pages/line-charts/line-charts";
import {Storage} from '@ionic/storage';

export class ReportDataSet {
  icon: string;
  name: string;
  component: any;

  constructor(icon: string, name: string, component: any) {
    this.icon = icon;
    this.name = name;
    this.component = component;
  }
}

/*
  Generated class for the ReportService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ReportService {
  token: string;

  host: string = "http://123.242.172.133/sysdamrongdham/";
  reportType: string = this.host + "api/report/report_test_app";
  reportlist: ReportDataSet[];

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello ReportService Provider');
  }

  getReportList() {
    return new Promise((resolve) => {

      this.reportlist = [
        new ReportDataSet('asset_1.png', 'รายงานรวมเรื่องร้องทุกข์', LineCharts),
        new ReportDataSet('asset_2.png', 'รายงานจำนวนเรื่องร้องทุกข์ตามลักษณะเรื่อง', DonusCharts),
        new ReportDataSet('asset_3.png', 'รายงานสถิติเรื่องร้องเรียนร้องทุกข์ตามประเภทเรื่อง', DonusCharts),
        new ReportDataSet('asset_4.png', 'รายงานภาพรวมสถิติเรื่องร้องทุกข์ตามสถานะ', DonusCharts),
        new ReportDataSet('asset_5.png', 'รายงานภาพรวมสถิติเปรียบเทียบเรื่องร้องทุกข์', DonusCharts)
      ];
      resolve(this.reportlist);
    });
  }


  getDataSetReportType(token: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({ headers: headers });
    console.log('test_data = ' + token);
    return new Promise((resolve, reject) => {
      this.http.get(this.reportType, options).map((res)=> res.json()).subscribe(
        (data)=>{
        resolve(data);
      },(err) => {
          reject(err);
      })
    });
  }

}
