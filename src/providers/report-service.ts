import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {DonusCharts} from "../pages/donus-charts/donus-charts";
import {LineCharts} from "../pages/line-charts/line-charts";
import {ReportAllComplaint} from "../pages/report-all-complaint/report-all-complaint";
import {ReportStatisticByType} from "../pages/report-statistic-by-type/report-statistic-by-type";
import {ReportStatisticByStatus} from "../pages/report-statistic-by-status/report-statistic-by-status";

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
  public reportlist :ReportDataSet[] = [];

  constructor(public http: Http) {
    console.log('Hello ReportService Provider');
  }

  getReportList() {
    return new Promise((resolve) => {
      this.reportlist = [
        new ReportDataSet('asset_1.png', 'รายงานรวมเรื่องร้องทุกข์', LineCharts),
        new ReportDataSet('asset_2.png', 'รายงานจำนวนเรื่องร้องทุกข์ตามลักษณะเรื่อง', ReportAllComplaint),
        new ReportDataSet('asset_3.png', 'รายงานสถิติเรื่องร้องเรียนร้องทุกข์ตามประเภทเรื่อง', ReportStatisticByType),
        //new ReportDataSet('asset_4.png', 'รายงานภาพรวมสถิติเรื่องร้องทุกข์ตามสถานะ', ReportStatisticByStatus)

      ];
      resolve(this.reportlist);
    });
  }

}
