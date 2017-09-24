import {Component, Injectable, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Auth} from "../../providers/auth";
import {Reports} from "../../providers/reports";
import {BaseChartDirective} from "ng2-charts";

@Injectable()
@Component({
  selector : 'page-report-statistic',
  templateUrl : 'report-statistic.html'
})

export class ReportStatistic{

  @ViewChild(BaseChartDirective) _charts: BaseChartDirective;

  reportChartsData:Array<any> = [0];
  reportChartsLabels:Array<any> = ["ไม่มีข้อมูล"];
  reportChartsColors:Array<any> = [];
  reportChartsOptions:any = { responsive : true};
  reportsChartType:string = "line";

  constructor(public nav: NavController, public auth: Auth, public report: Reports){
     console.log("constructor ReportStatistic");
   }

   ionViewWillEnter(){
    console.log("ionViewWillEnter ReportStatistic");
    this.loadDataSets();
   }

   ionViewDidLoad(){
    console.log("ionViewDidLoad ReportStatistic");
   }

   ionViewDidEnter(){
     console.log("ionViewDidEnter ReportStatistic");
   }

   chartsOnClick(event:any){
     console.log("Charts On Click");
   }

   chartOnHover(event:any){
     console.log("Chart On Hover");
   }

   loadDataSets(){
     this.auth.isCheck().then((token: string) => {
       //console.log(token);
       return token;
     }).then(token => {
       return this.report.getReportStatitic(token);
     }).then((data: any) => {
       console.log(data);
       // console.log(" count : ", Object.keys(data).length);
       // let x = 0;
       // this.reportChartsData = new Array(1);
       // this.reportChartsData[0] = {data : new Array(12) , label : "เรื่อง"};
       // for(let i in data){
       //   this.reportChartsData[0].data[x] = data[i].value;
       //   this.reportChartsLabels[x] = data[i].name;
       //   x++;
       // }
       //
       // this.refreshCharts();
     }).catch((err) => {
       console.log(err);
     })
   }

   refreshCharts(){
     if(this._charts && this._charts.chart && this._charts.chart.config){
       this._charts.chart.config.data.labels = this.reportChartsLabels;
       this._charts.chart.config.data.datasets = this.reportChartsData;
       this._charts.chart.update();
     }
   }

}
