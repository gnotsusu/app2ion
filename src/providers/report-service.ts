import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DonusCharts} from "../pages/donus-charts/donus-charts";

export class ReportDataSet{
  name:string;
  component:any;

  constructor(name: string, component: any) {
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

  reportlist: ReportDataSet[];

  constructor(public http: Http) {
    console.log('Hello ReportService Provider');
  }

  getReportList(){
    return new Promise((resolve)=>{

      this.reportlist = [
        new ReportDataSet('DonutCharts', DonusCharts),
        new ReportDataSet('DonutCharts', DonusCharts),
        new ReportDataSet('DonutCharts', DonusCharts),
        new ReportDataSet('DonutCharts', DonusCharts),
        new ReportDataSet('DonutCharts', DonusCharts)
      ];
      resolve(this.reportlist);
    });
  }

  getDataSet(){

  }


}
