import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Auth} from "../../providers/auth";
import {Reports} from "../../providers/reports";
import {BaseChartDirective} from "ng2-charts";

/**
 * Generated class for the DonusCharts page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-line-charts',
  templateUrl: 'line-charts.html',
})
export class LineCharts {

  @ViewChild(BaseChartDirective) public _chart: BaseChartDirective;

  public chartOptions: any = {responsive: true};
  public doughnutChartLabels: Array<any> = ["ไม่มีข้อมูล" ,"ไม่มีข้อมูล" ,"ไม่มีข้อมูล"];
  public doughnutChartData: Array<any> = [{data : [0] , label : 'ไม่มีข้อมูล'},
                                          {data : [0] , label : 'ไม่มีข้อมูล'},
                                          {data : [0] , label : 'ไม่มีข้อมูล'}];
  public doughnutChartType: string = 'line';
  public lineChartColors:Array<any> = [
    { // first color
      backgroundColor: 'rgba(104, 224, 228, 0)',
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
    }
  ];

  public title:string = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public reports: Reports,
              public auth: Auth) {
    this.title = this.navParams.get('title');
  }

  ionViewDidEnter(){
    console.log("ionViewWillEnter LineCharts");
    this.loadCharts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LineCharts');
    //this.loadCharts();
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  chartClicked(e: any): void {
    console.log(e);
  }


  loadCharts(){
    this.auth.isCheck().then((token: string) => {
      //console.log(token);
      return token;
    }).then(token => {
      return this.reports.getReport(token);
    }).then((data: any) => {

      this.doughnutChartLabels = new Array(data.lables.length);
      for (let i = 0; i < data.lables.length; i++) {
        this.doughnutChartLabels[i] = data.lables[i];
      }

      this.doughnutChartData = new Array(data.datasets.length);
      for (let i = 0; i < data.datasets.length; i++) {
        console.log(this.lineChartColors[i].backgroundColor);
        this.doughnutChartData[i] = {data: new Array(data.datasets[i].data.length),
          label: data.datasets[i].label,
          backgroundColor : this.lineChartColors[i].backgroundColor,
          borderColor: this.lineChartColors[i].borderColor,
          pointBackgroundColor: this.lineChartColors[i].pointBackgroundColor,
          pointBorderColor: this.lineChartColors[i].pointBorderColor,
          pointHoverBackgroundColor: this.lineChartColors[i].pointHoverBackgroundColor,
          pointHoverBorderColor: this.lineChartColors[i].pointHoverBorderColor
        };
        for (let j = 0; j < data.datasets[i].data.length; j++) {
          this.doughnutChartData[i].data[j] = data.datasets[i].data[j];
        }
      }

      this.refreshCharts();

    }).catch(err => {
      console.debug(err);
    });
  }

  refreshCharts(){
    if (this._chart && this._chart.chart && this._chart.chart.config) {
      this._chart.chart.config.data.labels = this.doughnutChartLabels;
      this._chart.chart.config.data.datasets = this.doughnutChartData;
      this._chart.colors = this.lineChartColors;
      this._chart.chart.update();
    }


  }


}
