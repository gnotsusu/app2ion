import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Auth} from "../../providers/auth";
import {Reports} from "../../providers/reports";
import {BaseChartDirective} from "ng2-charts";

@IonicPage()
@Component({
  selector: 'page-report-all-complaint',
  templateUrl: 'report-all-complaint.html'
})

export class ReportAllComplaint {

  @ViewChild(BaseChartDirective) public _chart: BaseChartDirective;

  public reportChartsData: Array<any> = [{data: [0, 0, 0, 0, 0, 0], label: "ไม่มีข้อมูล"}];
  public reportChartsLabels: Array<any> = ["ไม่มีข้อมูล"];
  public reportChartsColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(104, 224, 228, 0.1)',
      borderColor: 'rgba(104, 224, 228, 0.6)',
      pointBackgroundColor: 'rgba(104, 224, 228, 0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(104, 224, 228, 0.2)'
    },
    { // first color
      backgroundColor: 'rgba(237, 222, 17, 0)',
      borderColor: 'rgba(237, 222, 17, 0.6)',
      pointBackgroundColor: 'rgba(237, 222, 17, 0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(237, 222, 17,0.2)'
    },
    { // first color
      backgroundColor: 'rgba(237, 17, 21, 0)',
      borderColor: 'rgba(237, 17, 21, 0.6)',
      pointBackgroundColor: 'rgba(237, 17, 21, 0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(237, 17, 21, 0.2)'
    }];

  public reportChartsOptions: any = {responsive: true};
  public reportsChartType: string = "line";
  public title:string = '';
  constructor(public nav: NavController,
              public navParams: NavParams,
              public auth: Auth,
              public report: Reports) {
    console.log("constructor ReportAllComplaint");
    this.title = navParams.get('title');
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter ReportAllComplaint");

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ReportAllComplaint");
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter ReportAllComplaint");
    this.loadDataSets();
  }

  chartsOnClick(event: any) {
    console.log("Charts On Click");
  }

  chartOnHover(event: any) {
    console.log("Chart On Hover");
  }

  loadDataSets() {
    this.auth.isCheck().then((token: string) => {
      //console.log(token);
      return token;
    }).then(token => {
      return this.report.getReportAllComplaint(token);
    }).then((data: any) => {

      this.reportChartsData = new Array(data.report.datasets.length);
      this.reportChartsLabels = new Array(data.report.labels.length);
      this.reportChartsData = data.report.datasets;
      for(let i=0; i < this.reportChartsData.length; i++){
        this.reportChartsData[i].backgroundColor = this.reportChartsColors[i].backgroundColor;
        this.reportChartsData[i].borderColor = this.reportChartsColors[i].borderColor;
        this.reportChartsData[i].pointBackgroundColor = this.reportChartsColors[i].pointBackgroundColor;
        this.reportChartsData[i].pointBorderColor = this.reportChartsColors[i].pointBorderColor;
        this.reportChartsData[i].pointHoverBackgroundColor = this.reportChartsColors[i].pointHoverBackgroundColor;
        this.reportChartsData[i].pointHoverBorderColor = this.reportChartsColors[i].pointHoverBorderColor;
      }
      this.reportChartsLabels = data.report.labels;
      console.log(this.reportChartsData);
      this.refreshCharts();

    }).catch((err) => {
      console.log(err);
    })
  }

  refreshCharts(){
    if (this._chart && this._chart.chart && this._chart.chart.config) {
      this._chart.chart.config.data.labels = this.reportChartsLabels;
      this._chart.chart.config.data.datasets = this.reportChartsData;
      this._chart.chart.update();

    }
  }
}
